import { useState } from "react";

export default function RemoveBackground() {
  const [image, setImage] = useState(null);
  const [bgRemove, setBgRemove] = useState(null);
  const [loading, setLoading] = useState(false);

  // Default image
  const defaultImage = "./img-1.jpg";
  const removeBgImage = "./img-2.png"; // Replace with the actual path to your default image

  const handleRemoveBackground = async () => {
    if (!image) return; // Exit if no image is selected

    const apiKey = "Your Api Key";
    const apiUrl = "https://api.remove.bg/v1.0/removebg";

    const formData = new FormData();
    formData.append("image_file", image, image.name);
    formData.append("size", "auto");

    setLoading(true); // Set loading to true when the process starts

    try {
      const res = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "X-Api-Key": apiKey,
        },
        body: formData,
      });

      if (!res.ok) throw new Error("Network response was not ok");

      const data = await res.blob();
      const reader = new FileReader();
      reader.onloadend = () => {
        setBgRemove(reader.result);
        setLoading(false); // Set loading to false when the process is complete
      };
      reader.readAsDataURL(data);
    } catch (error) {
      console.error(error);
      setLoading(false); // Set loading to false if there's an error
    }
  };

  return (
    <div>
      <div className="flex justify-center">
        <div className="">
          {/* Input  */}
          <div className="input">
            {/* Input Tag  */}
            <div className="input border border-gray-700 px-2 py-2 rounded-lg bg-gray-950 mb-5">
              <input
                type="file"
                onChange={(e) => {
                  setImage(e.target.files[0]);
                  setBgRemove(null); // Reset bgRemove when a new image is selected
                }}
                className="text-sm text-gray-500 file:mr-5 file:py-1 file:px-3 file:text-xs file:font-medium file:border-0 file:rounded-md file:bg-gray-800 file:text-gray-500 hover:file:cursor-pointer hover:file:bg-blue-50 hover:file:text-blue-700 lg:w-[40em]"
              />
            </div>

            {/* Remove Background Button  */}
            <div className="flex justify-center mb-5">
              <button
                type="button"
                onClick={handleRemoveBackground}
                className="text-black bg-gradient-to-r from-teal-200 to-lime-200 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Remove Background
              </button>
            </div>
          </div>

          {/* Output  */}
          <div className="flex gap-1 mb-5">
            <div className="border-2 border-gray-500 rounded-l-lg border-dashed flex justify-center p-2 w-40 lg:w-80">
              <img
                className="w-90 h-90"
                src={image ? URL.createObjectURL(image) : defaultImage}
                alt="Original"
              />
            </div>

            <div className="relative border-2 border-gray-500 rounded-r-lg border-dashed flex justify-center p-2 w-40 lg:w-80">
              {loading ? (
                <div className="spinner-container flex items-center justify-center">
                  <div className="spinner-border loader" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              ) : (
                bgRemove ? (
                  <img
                    className="w-90 h-90"
                    src={bgRemove}
                    alt="Processed"
                  />
                ) : (
                  !image && <img
                    className="w-90 h-90"
                    src={removeBgImage}
                    alt="Default"
                    style={{ display: 'block' }}
                  />
                )
              )}
            </div>
          </div>

          {bgRemove && (
            <div className="flex justify-center">
              <a className="w-full" href={bgRemove} download={"save.png"}>
                <button className="bg-gray-800 text-white w-full py-2 px-3 rounded-lg border border-gray-600">
                  Download
                </button>
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
