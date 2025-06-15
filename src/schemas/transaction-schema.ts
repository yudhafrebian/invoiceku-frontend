import * as Yup from "yup";

export const transactionSchema = Yup.object().shape({
    payment_proof: Yup.mixed()
        .required("Payment proof is required")
        .test("fileSize", "File too large, max 1MB", (value) =>
            value ? (value as File).size <= 1 * 1024 * 1024 : true
        )
        .test("fileType", "Only JPEG, JPG and PNG files are allowed", (value) =>
            value ? ["image/jpeg", "image/png", "image/jpg"].includes((value as File).type) : true
        ),
});
