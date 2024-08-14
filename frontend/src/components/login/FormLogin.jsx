import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Loader } from "lucide-react";
import { useUserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import { STUDENT_DASHBOARD_PATH } from "../../router";

// Minimum 8 characters, at least one uppercase letter, one lowercase letter, one number and one special character
const passwordValidation = new RegExp(
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
);

const formSchema = z.object({
    email: z
        .string()
        .min(5, { message: "Email must be at least 5 characters" })
        .email({ message: "Invalid email address" })
        .max(30, { message: "Email must be at most 30 characters" }),
    password: z
        .string()
        .min(8, { message: "Password must be at least 8 characters" })
        .regex(passwordValidation, {
            message:
                "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character",
        })
        .max(20, { message: "Password must be at most 20 characters" }),
});

function FormLogin() {
    const { login, setAuthenticated } = useUserContext();
    const navigate = useNavigate();
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });
    const {
        setError,
        resetField,
        formState: { isSubmitting },
    } = form;

    // 2. Define a submit handler.
    const onSubmit = async (values) => {
        await login(values.email, values.password)
            .then((res) => {
                if (res.status === 204) {
                    setAuthenticated(true);
                    navigate(STUDENT_DASHBOARD_PATH);
                }
            })
            .catch(({ response }) => {
                setError("email", {
                    type: "custom",
                    message: response.data.errors.email,
                });
                resetField("password");
            });
    };
    return (
        <>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8"
                >
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input
                                        type="email"
                                        placeholder="Email"
                                        {...field}
                                    />
                                </FormControl>
                                <FormDescription>
                                    We&apos;ll never share your email.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input
                                        type="password"
                                        placeholder="Password"
                                        {...field}
                                    />
                                </FormControl>
                                <FormDescription>
                                    Use 8 or more characters with a mix of
                                    letters, numbers & symbols.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button
                        disabled={isSubmitting}
                        type="submit"
                        className="flex justify-center items-center gap-2"
                    >
                        {isSubmitting && <Loader className="animate-spin" />}
                        <span>Sign in</span>
                    </Button>
                </form>
            </Form>
        </>
    );
}

export default FormLogin;
