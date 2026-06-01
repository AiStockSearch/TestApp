import * as zod from 'zod';

export interface ProfileValidationSchema {
  firstName: string;
  lastName: string;
  secondName: string;
  iin: string;
  birthDate: string;
  isCardNumber: string;
  idCardIssueDate: string;
  idCardIssuedBy: string;
  driverLicense: string;
  dlCategory: string;
  dlIssueDate: string;
  citizenship: string;
}

class ValidateForm {
  cardNumberRegex = /^[а-яА-Яa-zA-Z0-9]+$/;
  phoneRegex = /^\+7\s\(\d{3}\)\s\d{3}-\d{2}-\d{2}$/;
  iinRegex = /^[0-9]+$/;
  nameRegex = /^[a-zA-Z]+$/;
  dateStringRegex = /^(\d{2})\.(\d{2})\.(\d{4})$/;
  categorySchema() {
    return zod
      .string()
      .trim()
      .length(1, 'errorMessages.category.length')
      .refine(
        (category) => {
          return ['A', 'B', 'C', 'D', 'E'].includes(
            category,
          );
        },
        {
          message: 'errorMessages.category.invalid',
        },
      );
  }
  dateStringSchema() {
    return zod
      .string()
      .min(10, 'errorMessages.dateString.min')
      .max(10, 'errorMessages.dateString.max')
      .regex(
        this.dateStringRegex,
        'errorMessages.dateString.invalidFormat',
      )
      .refine((dateStr) => {
        const match = dateStr.match(this.dateStringRegex);
        if (!match) {
          return false;
        }

        const day = parseInt(match[1] || '0', 10);
        const month = parseInt(match[2] || '0', 10);
        const year = parseInt(match[3] || '0', 10);

        const date = new Date(year, month - 1, day);
        return (
          date.getFullYear() === year &&
          date.getMonth() === month - 1 &&
          date.getDate() === day
        );
      }, 'errorMessages.dateString.dateExists');
    // .refine((dateStr) => {
    //   const date = new Date(dateStr);
    //   return date >= new Date();
    // }, 'errorMessages.dateString.dateFuture')
  }
  birthdaySchema() {
    return this.dateStringSchema().refine((dateStr) => {
      const match = dateStr.match(this.dateStringRegex);
      if (!match) {
        return false;
      }

      const day = parseInt(match[1] || '0', 10);
      const month = parseInt(match[2] || '0', 10);
      const year = parseInt(match[3] || '0', 10);

      const today = new Date();
      let age = today.getFullYear() - year;
      const birthdayThisYear = new Date(
        today.getFullYear(),
        month - 1,
        day,
      );
      if (today < birthdayThisYear) {
        age--;
      }

      return age >= 18 && age <= 65;
    }, 'errorMessages.birthday.ageRestriction');
  }
  iinSchema() {
    return zod
      .string()
      .trim()
      .min(10, 'errorMessages.iin.min')
      .max(12, 'errorMessages.iin.max')
      .regex(this.iinRegex, 'errorMessages.iin.invalid')
      .refine(
        (iin) => {
          return iin.match(this.iinRegex);
        },
        {
          message: 'errorMessages.iin.invalid',
        },
      );
  }
  nameSchema() {
    return zod
      .string()
      .trim()
      .min(3, 'errorMessages.name.min')
      .max(100, 'errorMessages.name.max')
      .regex(this.nameRegex, 'errorMessages.name.invalid')
      .refine(
        (name) => {
          return name.match(this.nameRegex);
        },
        {
          message: 'errorMessages.name.invalid',
        },
      );
  }
  isCardNumberSchema() {
    return zod
      .string()
      .trim()
      .min(10, 'errorMessages.isCardNumber.min')
      .regex(
        this.cardNumberRegex,
        'errorMessages.isCardNumber.invalid',
      );
  }
  idCardIssuedBySchema() {
    return zod.string().trim().min(1).max(20);
  }
  driverLicenseSchema() {
    return zod
      .string()
      .trim()
      .min(9, 'errorMessages.driverLicense.min')
      .max(12, 'errorMessages.driverLicense.max')
      .regex(
        this.cardNumberRegex,
        'errorMessages.driverLicense.invalid',
      );
  }

  citizenshipSchema() {
    return zod
      .string()
      .trim()
      .min(3, 'errorMessages.citizenship.min')
      .regex(
        this.nameRegex,
        'errorMessages.citizenship.invalid',
      );
  }
  profileValidationSchema(
    data: ProfileValidationSchema,
  ):
    | zod.ZodObject<zod.ZodRawShape>
    | zod.ZodError<ProfileValidationSchema> {
    try {
      return zod
        .object({
          firstName: this.nameSchema(),
          lastName: this.nameSchema(),
          secondName: this.nameSchema(),
          iin: this.iinSchema(),
          birthDate: this.birthdaySchema(),
          isCardNumber: this.isCardNumberSchema(),
          driverLicense: this.driverLicenseSchema(),
          dlCategory: this.categorySchema(),
          dlIssueDate: this.dateStringSchema(),
          citizenship: this.citizenshipSchema(),
          idCardIssuedBy: this.idCardIssuedBySchema(),
          idCardIssueDate: this.dateStringSchema(),
        })
        .parse(data);
    } catch (error) {
      return error as zod.ZodError<ProfileValidationSchema>;
    }
  }
}

export const validateForm = new ValidateForm();
