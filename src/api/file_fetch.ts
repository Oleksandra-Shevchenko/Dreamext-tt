import NetInfo from '@react-native-community/netinfo';
import {Dirs, FileSystem} from 'react-native-file-access';

export const fetchWithFS = async (url: string, path: string): Promise<any> => {
  const netInfo = await NetInfo.fetch();
  const isConnected = netInfo.isConnected;

  if (isConnected) {
    const response = await fetch(url);
    const data = await response.json();
    await FileSystem.writeFile(
      `${Dirs.CacheDir}/${path}`,
      JSON.stringify(data),
    );

    return data;
  }

  const result = await FileSystem.readFile(`${Dirs.CacheDir}/${path}`);

  return JSON.parse(result);
};
