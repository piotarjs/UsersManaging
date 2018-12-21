import { FormErrors } from 'redux-form';

interface FormData{
  firstName?: string,
  secondName?: string,
  uploadFile?: string
}

const checkFileType = (file: any): string => file.type;


export const validate  = ({ firstName, secondName, uploadFile }: FormData): FormErrors<FormData> => {
    const errors: FormErrors<FormData> = {};
    
    errors.firstName = firstName
    ?
      firstName.length > 2
      ?
      ''
      :
      'Imię musi składać się z co najmniej 3 liter'
    :
    'Podaj imię!'
    
    errors.secondName = secondName
    ?
    secondName.length > 2
      ?
      ''
      :
      'Nazwisko musi składać się z co najmniej 3 liter'
    :
    'Podaj nazwisko!'
  
    errors.uploadFile = (uploadFile && uploadFile.length > 0)
    ? 
      checkFileType(uploadFile[0]).match(/image\/*/)
      ?
      ''
      :
      'Wybierz plik graficzny' 
    : 
    'Wybierz plik!';
    
    return errors;
}