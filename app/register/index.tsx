import { useRegister } from "@/contexts/RegisterContext";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useRouter } from "expo-router";
import { useMemo, useState } from "react";
import { ActivityIndicator, Alert, KeyboardAvoidingView, Modal, Platform, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import CountryPicker, { Country, CountryCode } from "react-native-country-picker-modal";

// Input sanitization helpers
const sanitizeTextInput = (text: string): string => {
    // Remove any digits and special characters, keep only letters, spaces, hyphens and apostrophes
    return text.replace(/[^a-zA-ZÀ-ÿ\s'-]/g, '');
};

const sanitizePhoneInput = (text: string): string => {
    // Keep only digits, spaces, parentheses, and hyphens
    return text.replace(/[^0-9\s()-]/g, '');
};

const sanitizeCPFInput = (text: string): string => {
    // Keep only digits and format as CPF (###.###.###-##)
    const digits = text.replace(/\D/g, '').slice(0, 11);
    if (digits.length <= 3) return digits;
    if (digits.length <= 6) return `${digits.slice(0, 3)}.${digits.slice(3)}`;
    if (digits.length <= 9) return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6)}`;
    return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6, 9)}-${digits.slice(9)}`;
};

const formatDateDisplay = (dateString: string): string => {
    if (!dateString) return '';
    const [year, month, day] = dateString.split('-');
    return `${day}/${month}/${year}`;
};

export default function Register() {
    const router = useRouter();
    const { registerUser } = useRegister();

    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        phoneNumber: "",
        birthDate: "",
        cpf: "",
        gender: "",
        height: "",
        weight: "",
        role: "",
        cref: "",
    });
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<{ [k: string]: string }>({});

    const [countryCode, setCountryCode] = useState<CountryCode>("BR");
    const [callingCode, setCallingCode] = useState<string>("55");
    const [showPassword, setShowPassword] = useState(false);
    const [focusedField, setFocusedField] = useState<string | null>(null);

    const genderOptions = [
        { label: "Masculino", value: "MALE" },
        { label: "Feminino", value: "FEMALE" },
        { label: "Outro", value: "OTHER" },
    ];

    const heightOptions = useMemo(() => Array.from({ length: 81 }, (_, i) => (140 + i).toString()), []); // 140..220
    const weightOptions = useMemo(() => Array.from({ length: 161 }, (_, i) => (40 + i).toString()), []); // 40..200

    const [showDatePicker, setShowDatePicker] = useState(false);
    const [birthDateObj, setBirthDateObj] = useState<Date | undefined>(undefined);
    const [showGenderPicker, setShowGenderPicker] = useState(false);
    const [showHeightPicker, setShowHeightPicker] = useState(false);
    const [showWeightPicker, setShowWeightPicker] = useState(false);
    const [emailWarning, setEmailWarning] = useState<string>("");

    const handleChange = (key: string, value: string) => {
        // Real-time input sanitization
        let sanitizedValue = value;
        
        if (key === 'firstName' || key === 'lastName') {
            sanitizedValue = sanitizeTextInput(value);
        } else if (key === 'phoneNumber') {
            sanitizedValue = sanitizePhoneInput(value);
            // Limit to 15 digits (international standard max)
            const digitsOnly = sanitizedValue.replace(/\D/g, '');
            if (digitsOnly.length > 15) {
                return; // Don't update if exceeds limit
            }
        } else if (key === 'cpf') {
            sanitizedValue = sanitizeCPFInput(value);
        } else if (key === 'email') {
            // Remove spaces and convert to lowercase
            sanitizedValue = value.replace(/\s/g, '').toLowerCase();
            // Real-time email format validation warning
            if (sanitizedValue.length > 0) {
                if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(sanitizedValue)) {
                    setEmailWarning("Formato de e-mail inválido");
                } else {
                    setEmailWarning("");
                }
            } else {
                setEmailWarning("");
            }
        } else if (key === 'cref') {
            sanitizedValue = value.toUpperCase();
        }
        
        setForm((prev) => ({ ...prev, [key]: sanitizedValue }));
        
        // Clear error when user starts typing
        if (errors[key]) {
            setErrors((prev) => {
                const newErrors = { ...prev };
                delete newErrors[key];
                return newErrors;
            });
        }
    };

    // Errors are collected via `setErrors` in `validate()`; no single-field setter needed.

    const validate = (): boolean => {
        let valid = true;
        const newErrors: { [k: string]: string } = {};

        // First Name validation
        if (!form.firstName.trim()) {
            newErrors.firstName = "Nome é obrigatório";
            valid = false;
        } else if (form.firstName.trim().length < 2) {
            newErrors.firstName = "Nome muito curto";
            valid = false;
        } else if (/[^a-zA-ZÀ-ÿ\s'-]/.test(form.firstName)) {
            newErrors.firstName = "Use apenas letras";
            valid = false;
        }

        // Last Name validation
        if (!form.lastName.trim()) {
            newErrors.lastName = "Sobrenome é obrigatório";
            valid = false;
        } else if (form.lastName.trim().length < 2) {
            newErrors.lastName = "Sobrenome muito curto";
            valid = false;
        } else if (/[^a-zA-ZÀ-ÿ\s'-]/.test(form.lastName)) {
            newErrors.lastName = "Use apenas letras";
            valid = false;
        }

        // Email validation
        if (!form.email.trim()) {
            newErrors.email = "E-mail é obrigatório";
            valid = false;
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
            newErrors.email = "E-mail inválido";
            valid = false;
        }

        // Password validation
        if (!form.password) {
            newErrors.password = "Senha é obrigatória";
            valid = false;
        } else if (form.password.length < 8) {
            newErrors.password = "Mínimo de 8 caracteres";
            valid = false;
        } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(form.password)) {
            newErrors.password = "Use letras maiúsculas, minúsculas e números";
            valid = false;
        }

        // Phone validation
        const onlyDigits = form.phoneNumber.replace(/\D/g, "");
        if (!onlyDigits) {
            newErrors.phoneNumber = "Telefone é obrigatório";
            valid = false;
        } else if (onlyDigits.length < 10 || onlyDigits.length > 11) {
            newErrors.phoneNumber = "Telefone inválido (use DDD + número)";
            valid = false;
        }

        // Birth date validation
        if (!form.birthDate) {
            newErrors.birthDate = "Data de nascimento é obrigatória";
            valid = false;
        } else if (!/^\d{4}-\d{2}-\d{2}$/.test(form.birthDate)) {
            newErrors.birthDate = "Selecione a data";
            valid = false;
        } else {
            const birthDate = new Date(form.birthDate);
            const today = new Date();
            const age = today.getFullYear() - birthDate.getFullYear();
            if (age < 13) {
                newErrors.birthDate = "Você deve ter pelo menos 13 anos";
                valid = false;
            } else if (age > 120) {
                newErrors.birthDate = "Data inválida";
                valid = false;
            }
        }

        // CPF validation (optional but validate format if provided)
        if (form.cpf) {
            const cpfDigits = form.cpf.replace(/\D/g, '');
            if (cpfDigits.length !== 11) {
                newErrors.cpf = "CPF deve ter 11 dígitos";
                valid = false;
            }
        }

        // Gender validation
        if (!form.gender) {
            newErrors.gender = "Selecione seu gênero";
            valid = false;
        }

        // Height validation
        if (!form.height) {
            newErrors.height = "Selecione sua altura";
            valid = false;
        } else {
            const height = parseFloat(form.height);
            if (height < 140 || height > 220) {
                newErrors.height = "Altura deve estar entre 140-220 cm";
                valid = false;
            }
        }

        // Weight validation
        if (!form.weight) {
            newErrors.weight = "Selecione seu peso";
            valid = false;
        } else {
            const weight = parseFloat(form.weight);
            if (weight < 40 || weight > 200) {
                newErrors.weight = "Peso deve estar entre 40-200 kg";
                valid = false;
            }
        }

        // Role validation
        if (!form.role) {
            newErrors.role = "Selecione seu perfil";
            valid = false;
        }

        // CREF validation for trainers
        if (form.role === "TRAINER") {
            if (!form.cref.trim()) {
                newErrors.cref = "CREF é obrigatório para treinadores";
                valid = false;
            } else if (form.cref.length < 6) {
                newErrors.cref = "CREF inválido";
                valid = false;
            }
        }

        setErrors(newErrors);
        return valid;
    };

    const handleSubmit = async () => {
        const {
            firstName,
            lastName,
            email,
            password,
            phoneNumber,
            birthDate,
            cpf,
            gender,
            height,
            weight,
            role,
            cref,
        } = form;

        if (!validate()) return;

        setLoading(true);
        try {
            await registerUser(
                {
                    firstName,
                    lastName,
                    email,
                    password,
                    phoneNumber: `+${callingCode}${phoneNumber.replace(/\D/g, "")}`,
                    birthDate,
                        cpf: cpf ? cpf.replace(/\D/g, '') : undefined,
                    gender: gender as "MALE" | "FEMALE" | "OTHER",
                    height: parseFloat(height),
                    weight: parseFloat(weight),
                    role: (role as "STUDENT" | "TRAINER"),
                    status: "ACTIVE",
                },
                role === "TRAINER" ? cref : undefined
            );

            Alert.alert("Sucesso", "Cadastro realizado com sucesso!");
            router.replace("/");
        } catch (error: any) {
            console.error("Register error:", error);
            const message = error?.response?.data?.message || "Erro ao registrar. Tente novamente.";
            Alert.alert("Erro", message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} className="flex-1 bg-black">
            <ScrollView 
                contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 60, paddingBottom: 40 }}
                showsVerticalScrollIndicator={false}
            >
                {/* Header */}
                <View className="mb-10">
                    <Text className="text-4xl font-bold text-white mb-2">Criar Conta</Text>
                    <Text className="text-gray-400 text-base">Preencha seus dados para começar</Text>
                </View>

                {/* First Name */}
                <View className="mb-5">
                    <Text className="text-white text-sm font-semibold mb-2">Nome *</Text>
                    <TextInput
                        placeholder="Digite seu nome"
                        value={form.firstName}
                        onChangeText={(t) => handleChange("firstName", t)}
                        onFocus={() => setFocusedField("firstName")}
                        onBlur={() => setFocusedField(null)}
                        className={`bg-neutral-900 rounded-lg p-4 text-white text-base ${
                            errors.firstName 
                                ? "border-2 border-red-500" 
                                : focusedField === "firstName"
                                ? "border-2 border-orange-500"
                                : "border border-neutral-800"
                        }`}
                        placeholderTextColor="#6b7280"
                        autoCapitalize="words"
                    />
                    {errors.firstName && (
                        <Text className="text-red-500 text-xs mt-1 ml-1">{errors.firstName}</Text>
                    )}
                </View>

                {/* Last Name */}
                <View className="mb-5">
                    <Text className="text-white text-sm font-semibold mb-2">Sobrenome *</Text>
                    <TextInput
                        placeholder="Digite seu sobrenome"
                        value={form.lastName}
                        onChangeText={(t) => handleChange("lastName", t)}
                        onFocus={() => setFocusedField("lastName")}
                        onBlur={() => setFocusedField(null)}
                        className={`bg-neutral-900 rounded-lg p-4 text-white text-base ${
                            errors.lastName 
                                ? "border-2 border-red-500" 
                                : focusedField === "lastName"
                                ? "border-2 border-orange-500"
                                : "border border-neutral-800"
                        }`}
                        placeholderTextColor="#6b7280"
                        autoCapitalize="words"
                    />
                    {errors.lastName && (
                        <Text className="text-red-500 text-xs mt-1 ml-1">{errors.lastName}</Text>
                    )}
                </View>

                {/* Email */}
                <View className="mb-5">
                    <Text className="text-white text-sm font-semibold mb-2">E-mail *</Text>
                    <TextInput
                        placeholder="seu@email.com"
                        value={form.email}
                        onChangeText={(t) => handleChange("email", t)}
                        onFocus={() => setFocusedField("email")}
                        onBlur={() => setFocusedField(null)}
                        className={`bg-neutral-900 rounded-lg p-4 text-white text-base ${
                            errors.email 
                                ? "border-2 border-red-500" 
                                : emailWarning && form.email
                                ? "border-2 border-yellow-500"
                                : focusedField === "email"
                                ? "border-2 border-orange-500"
                                : "border border-neutral-800"
                        }`}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        placeholderTextColor="#6b7280"
                    />
                    {errors.email ? (
                        <Text className="text-red-500 text-xs mt-1 ml-1">{errors.email}</Text>
                    ) : emailWarning && form.email ? (
                        <Text className="text-yellow-500 text-xs mt-1 ml-1">{emailWarning}</Text>
                    ) : null}
                </View>

                {/* Password */}
                <View className="mb-5">
                    <Text className="text-white text-sm font-semibold mb-2">Senha *</Text>
                    <View className="relative">
                        <TextInput
                            placeholder="Mínimo 8 caracteres"
                            value={form.password}
                            onChangeText={(t) => handleChange("password", t)}
                            onFocus={() => setFocusedField("password")}
                            onBlur={() => setFocusedField(null)}
                            className={`bg-neutral-900 rounded-lg p-4 pr-12 text-white text-base ${
                                errors.password 
                                    ? "border-2 border-red-500" 
                                    : focusedField === "password"
                                    ? "border-2 border-orange-500"
                                    : "border border-neutral-800"
                            }`}
                            secureTextEntry={!showPassword}
                            placeholderTextColor="#6b7280"
                        />
                        <TouchableOpacity
                            onPress={() => setShowPassword(!showPassword)}
                            className="absolute right-4 top-4"
                        >
                            <Text className="text-orange-500 text-sm font-semibold">
                                {showPassword ? "Ocultar" : "Mostrar"}
                            </Text>
                        </TouchableOpacity>
                    </View>
                    {errors.password && (
                        <Text className="text-red-500 text-xs mt-1 ml-1">{errors.password}</Text>
                    )}
                    {!errors.password && form.password && (
                        <Text className="text-gray-500 text-xs mt-1 ml-1">
                            Use letras maiúsculas, minúsculas e números
                        </Text>
                    )}
                </View>

                {/* Phone Number */}
                <View className="mb-5">
                    <Text className="text-white text-sm font-semibold mb-2">Telefone *</Text>
                    <View className="flex-row items-center">
                        <CountryPicker
                            countryCode={countryCode}
                            withFilter
                            withFlag
                            withCallingCode
                            withCallingCodeButton
                            withEmoji
                            onSelect={(c: Country) => {
                                setCountryCode(c.cca2 as CountryCode);
                                const first = Array.isArray(c.callingCode) ? c.callingCode[0] : c.callingCode;
                                setCallingCode(first || "");
                            }}
                            containerButtonStyle={{
                                backgroundColor: "#171717",
                                borderWidth: 1,
                                borderColor: errors.phoneNumber ? "#ef4444" : "#262626",
                                borderRadius: 8,
                                paddingHorizontal: 12,
                                paddingVertical: 16,
                                marginRight: 8,
                            }}
                            theme={{
                                backgroundColor: "#171717",
                                onBackgroundTextColor: "#ffffff",
                                fontSize: 16,
                                filterPlaceholderTextColor: "#6b7280",
                                activeOpacity: 0.7,
                            }}
                        />
                        <TextInput
                            placeholder="(11) 98765-4321"
                            value={form.phoneNumber}
                            onChangeText={(t) => handleChange("phoneNumber", t)}
                            onFocus={() => setFocusedField("phoneNumber")}
                            onBlur={() => setFocusedField(null)}
                            className={`flex-1 bg-neutral-900 rounded-lg p-4 text-white text-base ${
                                errors.phoneNumber 
                                    ? "border-2 border-red-500" 
                                    : focusedField === "phoneNumber"
                                    ? "border-2 border-orange-500"
                                    : "border border-neutral-800"
                            }`}
                            keyboardType="phone-pad"
                            placeholderTextColor="#6b7280"
                            maxLength={20}
                        />
                    </View>
                    {errors.phoneNumber && (
                        <Text className="text-red-500 text-xs mt-1 ml-1">{errors.phoneNumber}</Text>
                    )}
                </View>

                {/* Birth Date */}
                <View className="mb-5">
                    <Text className="text-white text-sm font-semibold mb-2">Data de Nascimento *</Text>
                    <TouchableOpacity
                        onPress={() => setShowDatePicker(true)}
                        className={`bg-neutral-900 rounded-lg p-4 ${
                            errors.birthDate 
                                ? "border-2 border-red-500" 
                                : "border border-neutral-800"
                        }`}
                    >
                        <Text className={form.birthDate ? "text-white text-base" : "text-gray-500 text-base"}>
                            {form.birthDate ? formatDateDisplay(form.birthDate) : "DD/MM/AAAA"}
                        </Text>
                    </TouchableOpacity>
                    {errors.birthDate && (
                        <Text className="text-red-500 text-xs mt-1 ml-1">{errors.birthDate}</Text>
                    )}
                </View>

                {/* CPF */}
                <View className="mb-5">
                    <Text className="text-white text-sm font-semibold mb-2">CPF (Opcional)</Text>
                    <TextInput
                        placeholder="000.000.000-00"
                        value={form.cpf}
                        onChangeText={(t) => handleChange("cpf", t)}
                        onFocus={() => setFocusedField("cpf")}
                        onBlur={() => setFocusedField(null)}
                        className={`bg-neutral-900 rounded-lg p-4 text-white text-base ${
                            errors.cpf 
                                ? "border-2 border-red-500" 
                                : focusedField === "cpf"
                                ? "border-2 border-orange-500"
                                : "border border-neutral-800"
                        }`}
                        keyboardType="numeric"
                        placeholderTextColor="#6b7280"
                        maxLength={14}
                    />
                    {errors.cpf && (
                        <Text className="text-red-500 text-xs mt-1 ml-1">{errors.cpf}</Text>
                    )}
                </View>

                {/* Gender */}
                <View className="mb-5">
                    <Text className="text-white text-sm font-semibold mb-2">Gênero *</Text>
                    <TouchableOpacity
                        onPress={() => setShowGenderPicker(true)}
                        className={`bg-neutral-900 rounded-lg p-4 ${
                            errors.gender ? "border-2 border-red-500" : "border border-neutral-800"
                        }`}
                    >
                        <Text className={form.gender ? "text-white text-base" : "text-gray-500 text-base"}>
                            {form.gender 
                                ? genderOptions.find(g => g.value === form.gender)?.label 
                                : "Selecione seu gênero"}
                        </Text>
                    </TouchableOpacity>
                    {errors.gender && (
                        <Text className="text-red-500 text-xs mt-1 ml-1">{errors.gender}</Text>
                    )}
                </View>

                {/* Height and Weight Row */}
                <View className="flex-row mb-5">
                    {/* Height */}
                    <View className="flex-1 mr-2">
                        <Text className="text-white text-sm font-semibold mb-2">Altura *</Text>
                        <TouchableOpacity
                            onPress={() => setShowHeightPicker(true)}
                            className={`bg-neutral-900 rounded-lg p-4 ${
                                errors.height ? "border-2 border-red-500" : "border border-neutral-800"
                            }`}
                        >
                            <Text className={form.height ? "text-white text-base" : "text-gray-500 text-base"}>
                                {form.height ? `${form.height} cm` : "cm"}
                            </Text>
                        </TouchableOpacity>
                        {errors.height && (
                            <Text className="text-red-500 text-xs mt-1 ml-1">{errors.height}</Text>
                        )}
                    </View>

                    {/* Weight */}
                    <View className="flex-1 ml-2">
                        <Text className="text-white text-sm font-semibold mb-2">Peso *</Text>
                        <TouchableOpacity
                            onPress={() => setShowWeightPicker(true)}
                            className={`bg-neutral-900 rounded-lg p-4 ${
                                errors.weight ? "border-2 border-red-500" : "border border-neutral-800"
                            }`}
                        >
                            <Text className={form.weight ? "text-white text-base" : "text-gray-500 text-base"}>
                                {form.weight ? `${form.weight} kg` : "kg"}
                            </Text>
                        </TouchableOpacity>
                        {errors.weight && (
                            <Text className="text-red-500 text-xs mt-1 ml-1">{errors.weight}</Text>
                        )}
                    </View>
                </View>

                {/* Role Selection */}
                <View className="mb-5">
                    <Text className="text-white text-sm font-semibold mb-3">Você é *</Text>
                    <View className="flex-row">
                        <TouchableOpacity
                            className={`flex-1 mr-2 py-4 rounded-lg border-2 ${
                                form.role === "STUDENT" 
                                    ? "bg-orange-500 border-orange-500" 
                                    : "bg-neutral-900 border-neutral-800"
                            }`}
                            onPress={() => handleChange("role", "STUDENT")}
                        >
                            <Text className={`text-center font-bold text-base ${
                                form.role === "STUDENT" ? "text-white" : "text-gray-400"
                            }`}>
                                Aluno
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            className={`flex-1 ml-2 py-4 rounded-lg border-2 ${
                                form.role === "TRAINER" 
                                    ? "bg-orange-500 border-orange-500" 
                                    : "bg-neutral-900 border-neutral-800"
                            }`}
                            onPress={() => handleChange("role", "TRAINER")}
                        >
                            <Text className={`text-center font-bold text-base ${
                                form.role === "TRAINER" ? "text-white" : "text-gray-400"
                            }`}>
                                Treinador
                            </Text>
                        </TouchableOpacity>
                    </View>
                    {errors.role && (
                        <Text className="text-red-500 text-xs mt-1 ml-1">{errors.role}</Text>
                    )}
                </View>

                {/* CREF - Only for Trainers */}
                {form.role === "TRAINER" && (
                    <View className="mb-5">
                        <Text className="text-white text-sm font-semibold mb-2">CREF *</Text>
                        <TextInput
                            placeholder="000000-G/UF"
                            value={form.cref}
                            onChangeText={(t) => handleChange("cref", t)}
                            onFocus={() => setFocusedField("cref")}
                            onBlur={() => setFocusedField(null)}
                            className={`bg-neutral-900 rounded-lg p-4 text-white text-base ${
                                errors.cref 
                                    ? "border-2 border-red-500" 
                                    : focusedField === "cref"
                                    ? "border-2 border-orange-500"
                                    : "border border-neutral-800"
                            }`}
                            placeholderTextColor="#6b7280"
                            autoCapitalize="characters"
                        />
                        {errors.cref && (
                            <Text className="text-red-500 text-xs mt-1 ml-1">{errors.cref}</Text>
                        )}
                    </View>
                )}

                {/* Submit Button */}
                <TouchableOpacity
                    className={`rounded-lg p-5 items-center mt-6 ${
                        loading ? "bg-orange-400" : "bg-orange-500"
                    }`}
                    onPress={handleSubmit}
                    disabled={loading}
                    activeOpacity={0.8}
                >
                    {loading ? (
                        <ActivityIndicator color="#fff" size="small" />
                    ) : (
                        <Text className="text-white font-bold text-lg">Criar Conta</Text>
                    )}
                </TouchableOpacity>

                {/* Login Link */}
                <TouchableOpacity 
                    onPress={() => router.push("/login")}
                    className="mt-6 items-center"
                >
                    <Text className="text-gray-400 text-sm">
                        Já tem uma conta? <Text className="text-orange-500 font-semibold">Entrar</Text>
                    </Text>
                </TouchableOpacity>

            {/* Date Picker Modal */}
            <Modal
                visible={showDatePicker}
                transparent
                animationType="slide"
                onRequestClose={() => setShowDatePicker(false)}
            >
                <View className="flex-1 bg-black/70 justify-end">
                    <View className="bg-neutral-900 rounded-t-3xl p-6">
                        <View className="flex-row justify-between items-center mb-6">
                            <TouchableOpacity onPress={() => setShowDatePicker(false)}>
                                <Text className="text-gray-400 text-base font-semibold">Cancelar</Text>
                            </TouchableOpacity>
                            <Text className="text-white text-lg font-bold">Data de Nascimento</Text>
                            <TouchableOpacity 
                                onPress={() => {
                                    if (birthDateObj) {
                                        const yyyy = birthDateObj.getFullYear();
                                        const mm = String(birthDateObj.getMonth() + 1).padStart(2, "0");
                                        const dd = String(birthDateObj.getDate()).padStart(2, "0");
                                        handleChange("birthDate", `${yyyy}-${mm}-${dd}`);
                                    }
                                    setShowDatePicker(false);
                                }}
                            >
                                <Text className="text-orange-500 text-base font-bold">Confirmar</Text>
                            </TouchableOpacity>
                        </View>
                        <DateTimePicker
                            mode="date"
                            value={birthDateObj || new Date(2000, 0, 1)}
                            maximumDate={new Date()}
                            display={Platform.OS === "ios" ? "spinner" : "default"}
                            onChange={(_event, selected) => {
                                if (selected) {
                                    setBirthDateObj(selected);
                                }
                            }}
                            textColor="#ffffff"
                        />
                    </View>
                </View>
            </Modal>

            {/* Gender Picker Modal */}
            <Modal
                visible={showGenderPicker}
                transparent
                animationType="slide"
                onRequestClose={() => setShowGenderPicker(false)}
            >
                <View className="flex-1 bg-black/70 justify-end">
                    <View className="bg-neutral-900 rounded-t-3xl p-6">
                        <View className="flex-row justify-between items-center mb-6">
                            <TouchableOpacity onPress={() => setShowGenderPicker(false)}>
                                <Text className="text-gray-400 text-base font-semibold">Cancelar</Text>
                            </TouchableOpacity>
                            <Text className="text-white text-lg font-bold">Selecione o Gênero</Text>
                            <View style={{ width: 70 }} />
                        </View>
                        <View>
                            {genderOptions.map((option) => (
                                <TouchableOpacity
                                    key={option.value}
                                    onPress={() => {
                                        handleChange("gender", option.value);
                                        setShowGenderPicker(false);
                                    }}
                                    className={`p-4 rounded-lg mb-2 ${
                                        form.gender === option.value 
                                            ? "bg-orange-500" 
                                            : "bg-neutral-800"
                                    }`}
                                >
                                    <Text className="text-white text-center text-base font-semibold">
                                        {option.label}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>
                </View>
            </Modal>

            {/* Height Picker Modal */}
            <Modal
                visible={showHeightPicker}
                transparent
                animationType="slide"
                onRequestClose={() => setShowHeightPicker(false)}
            >
                <View className="flex-1 bg-black/70 justify-end">
                    <View className="bg-neutral-900 rounded-t-3xl p-6" style={{ maxHeight: '70%' }}>
                        <View className="flex-row justify-between items-center mb-6">
                            <TouchableOpacity onPress={() => setShowHeightPicker(false)}>
                                <Text className="text-gray-400 text-base font-semibold">Cancelar</Text>
                            </TouchableOpacity>
                            <Text className="text-white text-lg font-bold">Selecione a Altura</Text>
                            <View style={{ width: 70 }} />
                        </View>
                        <ScrollView showsVerticalScrollIndicator={false}>
                            {heightOptions.map((height) => (
                                <TouchableOpacity
                                    key={height}
                                    onPress={() => {
                                        handleChange("height", height);
                                        setShowHeightPicker(false);
                                    }}
                                    className={`p-4 rounded-lg mb-2 ${
                                        form.height === height 
                                            ? "bg-orange-500" 
                                            : "bg-neutral-800"
                                    }`}
                                >
                                    <Text className="text-white text-center text-base font-semibold">
                                        {height} cm
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                    </View>
                </View>
            </Modal>

            {/* Weight Picker Modal */}
            <Modal
                visible={showWeightPicker}
                transparent
                animationType="slide"
                onRequestClose={() => setShowWeightPicker(false)}
            >
                <View className="flex-1 bg-black/70 justify-end">
                    <View className="bg-neutral-900 rounded-t-3xl p-6" style={{ maxHeight: '70%' }}>
                        <View className="flex-row justify-between items-center mb-6">
                            <TouchableOpacity onPress={() => setShowWeightPicker(false)}>
                                <Text className="text-gray-400 text-base font-semibold">Cancelar</Text>
                            </TouchableOpacity>
                            <Text className="text-white text-lg font-bold">Selecione o Peso</Text>
                            <View style={{ width: 70 }} />
                        </View>
                        <ScrollView showsVerticalScrollIndicator={false}>
                            {weightOptions.map((weight) => (
                                <TouchableOpacity
                                    key={weight}
                                    onPress={() => {
                                        handleChange("weight", weight);
                                        setShowWeightPicker(false);
                                    }}
                                    className={`p-4 rounded-lg mb-2 ${
                                        form.weight === weight 
                                            ? "bg-orange-500" 
                                            : "bg-neutral-800"
                                    }`}
                                >
                                    <Text className="text-white text-center text-base font-semibold">
                                        {weight} kg
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                    </View>
                </View>
            </Modal>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}
