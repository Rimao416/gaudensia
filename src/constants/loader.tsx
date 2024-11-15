import { LineWave } from "react-loader-spinner";

export default function LoadingSpinner() {
  return (
    <div className="spinner-container">
      <LineWave
        visible={true}
        height="50"   // Taille du spinner
        width="50"    // Taille du spinner
        color="#4fa94d"
        ariaLabel="line-wave-loading"
      />
    </div>
  );
}
