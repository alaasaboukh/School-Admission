import SignupPage from "@/components/SignupPage";
import ToggleSwitcher from "@/components/ToggleSwitcher";


const SignUp = () => {
    return (
        <div className="bg-[var(--color-secondary)] p-6 w-full">
            <ToggleSwitcher />
            <SignupPage />
        </div>
    );
};

export default SignUp;
