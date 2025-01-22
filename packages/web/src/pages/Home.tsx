import { useEffect, useState } from 'react';
import { Message } from 'shared';
import { useHttp } from '../hooks/useHttp';

export const HomePage = () => {
  const { get, post } = useHttp();

  const { data: hello } = get<Message>('/api/hello');
  const { data: helloauth } = get<Message>('/api/hello-auth');
  const { data: time } = get<Message>('/api/time', {
    refreshInterval: 3000,
  });

  const [echo, setEcho] = useState<string>('');
  useEffect(() => {
    post<Message>('/api/echo', { message: 'echo' })
      .then((res) => setEcho(res.data.message))
      .catch((err) => console.error(err));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <h1>Home</h1>
      <div>This is HomePage</div>
      <div>{hello ? hello?.message : 'Loading...'}</div>
      <div>{helloauth ? helloauth?.message : 'Loading...'}</div>
      {<div>Time: {`${time ? time.message : 'Loading...'}`}</div>}
      <div>echo: {`${JSON.stringify(echo)}`}</div>
    </>
  );
};
