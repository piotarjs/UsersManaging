import { FormErrors } from 'redux-form';

interface FormData{
  firstName?: string,
  secondName?: string,
  uploadFile?: string
}



export const validate  = ({ firstName, secondName, uploadFile }: FormData): FormErrors<FormData> => {
    const errors: FormErrors<FormData> = {};
    !firstName? errors.firstName = 'Podaj imię!' : 
      firstName.length < 3? errors.firstName = 'Imię musi składać się z co najmniej 3 liter' : errors.firstName = '';
    
    !secondName? errors.secondName = 'Podaj nazwisko!' : 
    secondName.length < 3? errors.secondName = 'Nazwisko musi składać się z co najmniej 3 liter' : errors.secondName = '';
  
    !uploadFile? errors.uploadFile = 'Wybierz plik!' : 
      uploadFile.length < 1? errors.uploadFile = 'Wybierz plik!' : errors.uploadFile = '';
    
    // console.log(typeof uploadFile);


    
    
  
    return errors;
}