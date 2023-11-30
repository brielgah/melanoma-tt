import RawImage from "@assets/data/testBase64Image.json";

import Lesion from "../models/lesion";
import Photo from "../models/photo";
import Reminder from "../models/reminder";

import Comparison from "@/models/comparison";
import PrediagnosisResult from "@/models/prediagnosisResult";
import User from "@/models/user";

export function getRemainders() {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  const remainders = [
    new Reminder(0, "Brazo", today),
    new Reminder(1, "Pierna", today),
    new Reminder(2, "Estomago", tomorrow),
    new Reminder(3, "Mano derecha", tomorrow),
  ];
  return remainders;
}

export function getPhotos(count: number) {
  const description = "Esta foto la tomé despues de ir a la playa";
  const photos = [];
  const id = Math.floor(Math.random() * 4);
  for (let i = 0; i < count; i++) {
    photos.push(
      new Photo(
        i,
        `photo${i}`,
        id,
        new Date(Date.now() - Math.random() * 10000000000),
        description,
        { name: "", data: "", ext: "" }
      )
    );
  }
  return photos;
}

export function getUsers(count: number): User[] {
  const baseUsers = ["Daniel", "Esteban", "Gabriel"];
  const users = [];
  for (let i = 0; i < count; i++) {
    users.push({
      userName: baseUsers[i % 3],
      hasWritePermission: i % 2 === 0,
      id: 0,
      password: "",
      name: "",
      lastName: "",
    });
  }
  return users;
}

export function getLesions() {
  const lesions = [
    new Lesion(0, "Brazo", getPhotos(1), undefined, getUsers(3)),
    new Lesion(1, "Espalda", getPhotos(3), "Gabriel"),
    new Lesion(2, "Mejilla", getPhotos(5)),
    new Lesion(3, "Cara", getPhotos(5), undefined, getUsers(2)),
    new Lesion(4, "Espalda", getPhotos(5)),
    new Lesion(5, "Pierna", getPhotos(15), "Esteban", undefined, true),
    new Lesion(6, "Abdomen", getPhotos(5), undefined, getUsers(1)),
    new Lesion(7, "Mano", getPhotos(20)),
  ];
  return lesions;
}

export function getComparison(
  beforeId: number,
  afterId: number,
  parameterName: string
) {
  const photos = getPhotos(3);
  const beforeValue = 98;
  const afterValue = 93;
  return new Comparison(
    "",
    "",
    "",
    "Las lesiones de cáncer de melanoma tienen un alto procentaje de asimetría.",
    parameterName,
    beforeValue,
    afterValue
  );
}

export function getPrediagnosisResult() {
  const image = { base64: RawImage.image };
  return new PrediagnosisResult(
    0.67,
    "La lesión es poco probable de ser causada por cáncer de melanoma.",
    image
  );
}
