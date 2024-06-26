import { ImSpinner2 } from "react-icons/im";

const LoadingSpinner: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center py-24">
            <ImSpinner2 size={44} className="animate-spin text-emerald-600" />
            <span className="mt-4 font-semibold tracking-wider">
                Loading<span className="text-emerald-600">...</span>
            </span>
        </div>
    );
};

export default LoadingSpinner;
