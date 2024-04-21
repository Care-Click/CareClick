const prisma = require("./prisma");
const doctors = require("../data/doctors.json");
const patients = require("../data/patiens.json");
const patientsMedInfos = require("../data/patientsMedInfo.json");
const doctorsmedinfos = require("../data/doctorsmedinfo.json");

const Requests = require("../data/requests.json");
const Reports = require("../data/reports.json");

async function seed() {
    for (const doctor of doctors) {
      await prisma.Doctor.create({
        data: doctor,
      });
    }
    for (const patient of patients) {
      await prisma.patient.create({
        data: patient,
      });
    }
    for (const patientsMedInfo of patientsMedInfos) {
      await prisma.MedicalInfo.create({
        data: patientsMedInfo,
      });
    }
    for (const medicalExp of doctorsmedinfos) {
      await prisma.MedicalExp.create({
        data: medicalExp,
      });
    }
  for (const Request of Requests) {
    await prisma.Request.create({
      data: Request,
    });
  }
for (const Report of Reports) {
    await prisma.Report.create({
      data: Report,
    });
  }

  console.log("Seed completed successfully");
  await prisma.$disconnect();
}

seed().catch((error) => {
  console.error("Error seeding database:", error);
  process.exit(1);
});
