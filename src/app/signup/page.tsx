import SignupPage from "@/components/Authontications/SignupPage";
import TopComponent from "@/components/Nested/TopComponent";


const SignUp = () => {
    return (
        <div className="bg-[var(--color-secondary)] p-6 w-full h-screen">
            <TopComponent text="Signup" />
            <SignupPage />
        </div>
    );
};

export default SignUp;
