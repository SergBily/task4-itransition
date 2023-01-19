import axios, { AxiosError } from 'axios';
import RegistLoginFields from '../models';
import URL_SERVER from '../environment';
import AlertMessage from '../components/alert/AlertMessage';

const useNewUser = async (user: RegistLoginFields): Promise<void> => {
  console.log(user);

  try {
    const response = await axios.post(URL_SERVER, user);
    console.log(response);
  } catch (error: unknown) {
    const err = error as AxiosError;
    AlertMessage({ message: err.message });
    console.log(err.message);
  }
};

export default useNewUser;
