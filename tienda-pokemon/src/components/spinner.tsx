import "../styles/spinner.css";

export interface SpinnerProps {
    size: "small" | "medium" | "large";
    color?: string;
    message?: string;
}

const Spinner: React.FC<SpinnerProps> = ({ size = 'medium', message }) => {
    const spinnerSize = {
        small: "20px",
        medium: "40px",
        large: "60px"
    }[size];

    return (
        <div className="spinner-container">
            <div style={{width: spinnerSize, height: spinnerSize}} className="spinner"></div>
            {message && <p className="spinner-tex">{message}</p>}
        </div>
    )
}

export default Spinner;