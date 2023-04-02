import operationsService from "../services/operationsService";

const uploadToMathpix = async (imageUrl) => {
    const { app_token, app_token_expires_at} = await operationsService.getMathpixToken();
    // constructs the data for the fetch request to mathpix
    const mathpixData = {
        src: imageUrl,
        formats: ["data"],
        data_options: {
          include_latex: true,
        },
        ocr: ["math", "text"],
    };

    // constructs options: method, header and body for the fetch request
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            app_token: app_token,
            app_token_expires_at: app_token_expires_at,
        },
        body: JSON.stringify(mathpixData),
    };
    const result = await fetch("https://api.mathpix.com/v3/text", options);
    const jsonResult = await result.json();
    if (jsonResult.data) {
        return jsonResult.data;
    } else {
        return jsonResult;
    }
}

export default uploadToMathpix