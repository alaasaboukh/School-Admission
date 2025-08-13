// import CreateFoodForm from "@/components/CreateFoodForm";
import FoodList from "@/components/FoodList";
import TopComponent from "@/components/TopComponent";

const Page = () => {
    return (
        <div className="bg-[var(--color-secondary)] p-6 w-full">
            {/* <CreateFoodForm /> */}
            <TopComponent text="Food" />
            <FoodList />
        </div>
    );
};

export default Page;