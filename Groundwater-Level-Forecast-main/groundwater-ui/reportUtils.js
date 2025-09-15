import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export async function downloadPDF(mbgl, formattedHtml) {
    const container = document.createElement("div");
    container.style.width = "600px";
    container.innerHTML = `<h2>MBGL Value: ${mbgl}</h2><div>${formattedHtml}</div>`;
    document.body.appendChild(container);

    const canvas = await html2canvas(container, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "pt", "a4");
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

    pdf.addImage(imgData, "PNG", 20, 20, pdfWidth - 40, pdfHeight);
    pdf.save(`Groundwater_Report_MBGL_${mbgl}.pdf`);

    document.body.removeChild(container);
}
