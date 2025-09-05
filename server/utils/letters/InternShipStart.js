const PDFDocument = require("pdfkit");
const path = require("path");

// ✅ Added
const fs = require("fs");

const createInternShipStartLetter = async ({ date, name, startdate, enddate, superviosrname, req, res }) => {
    try {
        // Create PDF
        const doc = new PDFDocument({ margin: 50 });
        const filename = `letter_${name}.pdf`;

        res.setHeader("Content-Disposition", `attachment; filename=${filename}`);
        res.setHeader("Content-Type", "application/pdf");

        // ✅ Added: create folder & file path
        const folderPath = path.join(__dirname, "..", "upload", "letters", "internshipstart");
        if (!fs.existsSync(folderPath)) {
            fs.mkdirSync(folderPath, { recursive: true });
        }
        const savePath = path.join(folderPath, filename);
        const fileStream = fs.createWriteStream(savePath);

        // ✅ Pipe to both response (download) and file (save)
        doc.pipe(res);
        doc.pipe(fileStream);

        // ✅ Load your images
        const logoLeft = path.join(__dirname, "src", "uoplogo.png");
        const logoRight = path.join(__dirname, "src", "ceitlogo.png");

        // Insert logos
        doc.image(logoLeft, 50, 40, { width: 80 });   // left logo
        doc.image(logoRight, 450, 40, { width: 80 }); // right logo

        // Header Text
        doc
            .fontSize(16)
            .text("Information Technology Center", 0, 70, { align: "center" })
            .text("University of Peradeniya", { align: "center" })
            .moveDown(2);

        // ✅ Date (below header)
        doc.fontSize(12).text(`Date: ${date}`, 40, 160, { align: "left" }).moveDown(2);

        // Title
        doc.fontSize(14).text("Internship/Training Commencement Letter", {
            align: "left",
            underline: true,
        }).moveDown(1);

        // Body
        doc.font("Helvetica-Bold")
            .fontSize(12)
            .text(`Dear ${name},\n`)
            .moveDown(0.5);

        doc.font('Helvetica')
            .text(
                "We are pleased to inform you that you have been selected to undergo your internship/training program at the Information and Communication Technology (ICT) Center, University of Peradeniya.",
                {
                    lineGap: 2 // adds extra space between lines
                }
            ).moveDown(1);

        // Internship Details Heading (BOLD)
        doc.font("Helvetica-Bold")
            .text("Internship/Training Details:", { underline: true })
            .moveDown(0.5);

        // Reset font for list items
        doc.font("Helvetica");

        // List-style details
        const details = [
            `Intern Name: ${name}`,
            `Department: ICT Center`,
            `Duration: ${startdate} – ${enddate}`,
            `Supervisor: ${superviosrname}`,
            "Working Hours: 8:00 AM – 4:00 PM, Monday to Friday"
        ];

        details.forEach(item => {
            doc.text("• " + item, { indent: 20 }); // bullet with indent
        });

        doc.moveDown(1);

        doc.text(
            "During your training, you will be assigned to various projects and tasks related to ICT operations, system administration, software development, and technical support under the guidance of our team. You are expected to adhere to the rules, regulations, and professional standards of the ICT Center throughout your internship.", { lineGap: 2 }
        ).moveDown(1);

        doc.text(
            "Please report to the ICT Center, University of Peradeniya, at 8:30 AM on your start date to commence your training. Kindly bring a copy of this letter and your student identification card on your first day.", { lineGap: 2 }
        ).moveDown(1);

        doc.text(
            "We wish you a fruitful and successful training period. Should you require any assistance, feel free to contact the ICT Center administration.", { lineGap: 2 }
        ).moveDown(3);

        // Signature
        doc.text("Yours sincerely,", { lineGap: 2 }).moveDown(2);
        doc.text("Dr. Upul Jayasinghe", { lineGap: 2 });
        doc.text("Director", { lineGap: 2 });
        doc.text("ICT Center", { lineGap: 2 });
        doc.text("University of Peradeniya", { lineGap: 2 });

        // Finalize PDF
        doc.end();

        // ✅ Added: return file path when finished
        return new Promise((resolve, reject) => {
            fileStream.on("finish", () => resolve(savePath));
            fileStream.on("error", reject);
        });
    }
    catch (error) {
        console.error("Register Service Error:", error);
        return { success: false, message: "Internal Server Error", error };
    }
}

module.exports = { createInternShipStartLetter };
