import "../style/FileBanner.scss";
import { Hourglass  } from "react-loader-spinner";

export default function Loading() {
    return (
        <div className="loading-container">
            <Hourglass 
                visible={true}
                height="80"
                width="80"
                ariaLabel="hourglass-loading"
                wrapperStyle={{}}
                wrapperClass="loading-container"
                colors={['#306cce', '#72a1ed']}
            />
        </div>
    );
}
