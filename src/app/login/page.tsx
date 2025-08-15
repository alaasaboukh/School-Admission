import LoginPage from "@/components/Authontications/LoginPage"
import TopComponent from "@/components/Nested/TopComponent";

const Login = () => {

    return (
        <div className="bg-[var(--color-secondary)] p-6 w-full h-screen">
            <TopComponent text="Login" />
            <LoginPage />
        </div>
    )
}

export default Login