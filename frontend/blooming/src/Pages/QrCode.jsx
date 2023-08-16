import QRCode from "qrcode"

export default function QrCode() {

  const fileUrl = "https://drive.google.com/file/d/1k7cU1QCJhkn8giZaugqRVw7TRFu3tPqg/view?usp=sharing"

  QRCode.toDataURL(fileUrl, { errorCorrectionLevel: "H" })
    .then((qrCodeDataUrl) => {
        const imgElement = document.getElementById("qrCodeImage");
        imgElement.src = qrCodeDataUrl;
    })
    .catch((error) => {
        console.error("QR 코드 생성 실패: ", error);
    });
  return (
    <img id="qrCodeImage" alt="QR 코드" />
  )
}