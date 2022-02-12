import type { NextPage } from 'next';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { Box, Image, Text, Input, Stack, Button } from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';
import { gql, useMutation, useQuery } from '@apollo/client';

const Message: NextPage = () => {
  interface MESSAGE {
    id: number;
    name: string;
    message: string;
  }

  const ADD_Message = gql`
    mutation addMessage($message: String!, $name: String!) {
      insert_message(objects: { message: $message, name: $name }) {
        affected_rows
        returning {
          message
          name
        }
      }
    }
  `;

  const GET_MESSAGE = gql`
    query getMessage {
      message {
        id
        name
        message
      }
    }
  `;

  const [name, setName] = useState('');
  const [message, setMessage] = useState('');

  const [addMessage, { data, loading, error }] = useMutation(ADD_Message, {
    refetchQueries: [GET_MESSAGE, 'getMessage'],
  });

  const {
    data: getData,
    loading: getLoading,
    error: getError,
  } = useQuery<{ message: MESSAGE[] }>(GET_MESSAGE);

  const sendMessage = () => {
    addMessage({ variables: { message, name } }).then((result) => {
      console.log(result.data);
    });
  };

  return (
    <>
      <Text textAlign={'center'} fontFamily={'monospace'} fontSize={'24px'}>
        〜みんなからの二人へのメッセージ〜
      </Text>
      <Stack
        justifyContent={'center'}
        alignItems={'center'}
        width={'100%'}
        pt={'20px'}
        mt={'40px'}
        gap={'55px'}
      >
        {!getLoading &&
          getData!.message.map((v) => (
            <Box width={'90%'} key={v.message}>
              <Text width={'100%'} fontSize={'18px'} fontFamily={'serif'}>
                {v.message}
              </Text>
              <Text fontWeight={'bold'} textAlign={'end'}>
                {v.name}より
              </Text>
            </Box>
          )).reverse()}
      </Stack>
      <Input
        width={'80%'}
        onChange={(e) => setName(e.target.value)}
        mt={'55px'}
        placeholder={'名前'}
      />
      <Input
        width={'80%'}
        onChange={(e) => setMessage(e.target.value)}
        mt={'15px'}
        placeholder={'二人へのメッセージ'}
      />

      <Button onClick={() => sendMessage()} mt={'20px'} disabled={!(message && name)}>
        メッセージを送る
      </Button>
    </>
  );
};

export default Message;
