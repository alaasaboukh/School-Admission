import { ArrowLeft, ArrowRight } from "lucide-react";

type PaginationProps = {
    currentPage: number;
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
    totalPage: number;
    data: number;
};

const Pagination = ({
    currentPage,
    setCurrentPage,
    totalPage,
    data,
}: PaginationProps) => {
    const getPageNumbers = () => {
        if (typeof window !== "undefined" && window.innerWidth < 640) {
            const start = Math.max(1, currentPage - 1);
            const end = Math.min(totalPage, currentPage + 1);
            const pages = [];
            for (let i = start; i <= end; i++) pages.push(i);
            return pages;
        }
        return Array.from({ length: totalPage }, (_, i) => i + 1);
    };
    return (
        <div className="flex items-center justify-between p-5 max-md:flex-col max-md:gap-5">
            <p className="text-xs text-[var(--color-accent1)]">
                Showing {currentPage}-{totalPage} from {data} data
            </p>
            <div className="flex space-x-2 justify-end items-center">
                <span
                    className="text-[var(--color-accent1)] mr-1 cursor-pointer"
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                >
                    <ArrowLeft size={20} />
                </span>
                {getPageNumbers().map((num) => (
                    <button
                        key={num}
                        onClick={() => setCurrentPage(num)}
                        className={`border border-gray-500 w-9 h-9 rounded-full transition-all duration-500 cursor-pointer shadow-sm text-[14px] ${num === currentPage
                                ? "bg-[var(--color-primary)] text-white border-[var(--color-primary)]"
                                : "text-[var(--color-accent1)]"
                            }`}
                    >
                        {num}
                    </button>
                ))}
                <span
                    className="text-[var(--color-accent1)] ml-1 cursor-pointer"
                    onClick={() =>
                        setCurrentPage((prev) => Math.min(prev + 1, totalPage))
                    }
                >
                    <ArrowRight size={20} />
                </span>
            </div>
        </div>
    );
};

export default Pagination;
