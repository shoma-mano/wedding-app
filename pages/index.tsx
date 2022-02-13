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


    const [addMessage, {data, loading, error}] = useMutation(ADD_Message, {
        refetchQueries: [GET_MESSAGE, 'getMessage'],
    });


    //メッセージ取得
    const {
        data: getData,
        loading: getLoading,
        error: getError,
    } = useQuery<{ message: MESSAGE[] }>(GET_MESSAGE);
    const [count, setCount] = useState(Math.floor(10000 * Math.random()))
    const [messageOpacity,setMessageOpacity] =useState(1)

    useEffect(() => {
        setTimeout(() => {
            setMessageOpacity(0)
        }, 5000)
        setTimeout(() => {
            setCount(v => 1 + v)
            setMessageOpacity(1)
        }, 6000)
    },[count])

    // if(getData?.message && count !== getData.message.length){
    //   setCount(getData.message.length*Math.random())
    //   setInterval(()=>console.log("test"),1000)
    // }

    const sendMessage = () => {
        addMessage({variables: {message, name}}).then((result) => {
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
                mt={'20px'}
                gap={'20px'}
            >
                {!getLoading &&
                    (
                        <Box transition={'all 1s'} opacity={messageOpacity} width={'90%'}>
                            <Text transition={'all 1s'} width={'100%'} fontSize={'18px'} fontFamily={'serif'}>
                                {getData?.message[count % getData.message.length].message}
                            </Text>
                            <Text mt={'10px'} fontWeight={'bold'} textAlign={'end'}>
                                {getData?.message[count % getData.message.length].name}より
                            </Text>
                        </Box>
                    )}
            </Stack>
            <Text mt={'105px'} fontSize={'40px'} fontFamily={"'Shadows Into Light', cursive;"}>
                Wedding Day
            </Text>
            <Text mt={'5px'} fontFamily={"'Cutive Mono', monospace;"} fontSize={'25px'}>
                MARCH 5,2022
            </Text>
            <Text
                color={'#3C2014'}
                width={'160px'}
                textAlign={'center'}
                borderBottom={'solid 1px'}
                mt={'90px'}
                fontFamily={"'Euphoria Script', cursive;"}
                fontSize={'55px'}
            >
                M&S
            </Text>
            <Text
                color={'#3C2014'}
                mt={'10px'}
                fontFamily={"'Cutive Mono', monospace;"}
                fontSize={'20px'}
                fontWeight={'bold'}
            >
                2022.3.5
            </Text>



        </>
    );
};

export default Message;
