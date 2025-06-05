class CommonUtils {
  static getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.readAsDataURL(file);

      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }
  static decodeBase64ImageToBinary = (image) => {
    let imgBase64 = "";
    if (image) {
      try {
        imgBase64 = new Buffer(image, "base64").toString("binary");
      } catch (e) {
        console.error("Failed to decode image:", e);
      }
    }
    return imgBase64;
  }
}

export default CommonUtils;
