import type { NextPage } from 'next';
import Head from 'next/head';
import styles from '../../styles/Home.module.css';
import { Box, Image, Text, Icon, Stack } from '@chakra-ui/react';
import { useState } from 'react';
import { CloseIcon } from '@chakra-ui/icons';
import { gql, useMutation, useQuery } from '@apollo/client';

const Photos: NextPage = () => {
    const [imageSrc, setImageSrc] = useState<any>();
    const [uploadData, setUploadData] = useState<any>();

    const GET_URL = gql`
        query get_url {
            image {
                url
            }
        }
    `;

    const SAVE_URL = gql`
        mutation MyMutation($url: String!) {
            insert_image(objects: { url: $url }) {
                returning {
                    id
                    url
                }
            }
        }
    `;

    const [saveUrl, {data, loading, error}] = useMutation(SAVE_URL, {
        refetchQueries: [GET_URL, 'get_url'],
    });
    const {data: getData, loading: getLoading} =
        useQuery<{ image: Array<{ url: string }> }>(GET_URL);

    //Triggers when the file input changes (ex: when a file is selected)
    const handleOnChange = (changeEvent: any) => {
        const reader = new FileReader();

        reader.onload = function (onLoadEvent) {
            setImageSrc(onLoadEvent.target!.result);
            setUploadData(undefined);
        };

        reader.readAsDataURL(changeEvent.target.files[0]);
    };

    const handleOnSubmit = async (event: any) => {
        event.preventDefault();
        const form = event.currentTarget;
        const fileInput: any = Array.from(form.elements).find(({name}: any) => name === 'file');

        const formData = new FormData();
        for (const file of fileInput.files) {
            formData.append('file', file);
        }

        formData.append('upload_preset', 'ml_default');

        const data = await fetch('https://api.cloudinary.com/v1_1/dsu2ajyhb/upload', {
            method: 'POST',
            body: formData,
        }).then((r) => r.json());

        saveUrl({variables: {url: data.secure_url}}).then(() => setImageSrc(''));
    };

    return (
        <Box display={'flex'} flexDirection={'column'} alignItems={'center'} justifyContent={'center'}>
            <Stack gap={'50px'}>
                {!getLoading && getData!.image.map((v) =>
                    <Image width={'350px'} borderRadius={'5px'} key={v.url}
                           src={v.url}/>)}
            </Stack>
            <form
                className={styles.form}
                method='post'
                onChange={handleOnChange}
                onSubmit={handleOnSubmit}
                style={{marginTop: '100px'}}
            >
                <Box
                    mx={'auto'}
                    role='group'
                    color={'#AAA'}
                    position={'relative'}
                    cursor={'pointer'}
                    borderRadius={'15px'}
                    py={imageSrc ? '20px' : '0px'}
                    width={imageSrc ? '' : '400px'}
                    maxWidth={'80vw'}
                    height={imageSrc ? '' : '100px'}
                    backgroundColor={'#eee'}
                >
                    {imageSrc && (
                        <CloseIcon
                            onClick={() => setImageSrc('')}
                            _hover={{color: 'black'}}
                            position={'absolute'}
                            top={'15px'}
                            right={'15px'}
                            zIndex={110}
                        />
                    )}

                    {<input
                        style={{
                            cursor: 'pointer',
                            position: 'absolute',
                            zIndex: 100,
                            opacity: 0,
                            width: imageSrc ? '0px' : '400px',
                            maxWidth: '80vw',
                            height: imageSrc ? '0px' : '100px',
                        }}
                        className={styles.fileinput}
                        type='file'
                        name='file'
                    />}
                    {!imageSrc && (
                        <Text
                            fontFamily={'monospace'}
                            fontSize={['18px', '25px']}
                            position={'relative'}
                            top={['40px', '30px']}
                            textAlign={'center'}
                            zIndex={'10'}
                            _groupHover={{color: '#000000ab'}}
                        >
                            みんなで写真を共有しよう
                            <Icon
                                xmlns='http://www.w3.org/2000/svg'
                                version='1.1'
                                ml={'8px'}
                                mb={'3px'}
                                fontSize={'20px'}
                                x='0px'
                                y='0px'
                                viewBox='0 0 1000 1000'
                                enableBackground='new 0 0 1000 1000'
                                _groupHover={{color: '#000000ab'}}
                            >
                                <g>
                                    <path
                                        fill='currentColor'
                                        d='M850,974.5H150c-77.3,0-140-65.3-140-145.9V646.3c0-20.1,15.7-36.5,35-36.5h70c19.3,0,35,16.3,35,36.5v109.4c0,40.3,31.3,72.9,70,72.9h560c38.7,0,70-32.7,70-72.9V646.3c0-20.1,15.7-36.5,35-36.5h70c19.3,0,35,16.3,35,36.5v182.3C990,909.2,927.3,974.5,850,974.5L850,974.5z M784.5,449.2c-14.2,14.8-37.1,14.8-51.3,0L570,279.1v367.2c0,20.1-15.7,36.5-35,36.5h-70c-19.3,0-35-16.3-35-36.5V279.1L266.8,449.2c-14.2,14.8-37.1,14.8-51.3,0l-51.3-53.4c-14.2-14.8-14.2-38.7,0-53.4L453.2,41.1c1.2-1.3,23.7-15.6,46.4-15.6c22.9,0,45.9,14.3,47.2,15.6l289.1,301.2c14.2,14.8,14.2,38.7,0,53.4L784.5,449.2L784.5,449.2z'
                                    />
                                </g>
                            </Icon>
                        </Text>
                    )}

                    {imageSrc && (
                        <Image borderRadius={'5px'} my={'auto'} mx={'auto'} width={'50%'} maxWidth={'300px'}
                               src={imageSrc}/>
                    )}
                </Box>

                {imageSrc && !uploadData && (
                    <Box shadow={'sm'} mt={'20px'} fontWeight={'700'} borderRadius={'10px'} justifyContent={'center'}
                         backgroundColor={'white'} width={'150px'} mx={'auto'}>
                        <button style={{
                            height: '35px',
                            margin: 'auto',
                            width:'100%',
                            textAlign: 'center',
                            display: "block",
                            fontFamily: 'monospace'
                        }}>写真を共有する
                        </button>
                    </Box>
                )}

                {uploadData && (
                    <code>
                        <pre>{JSON.stringify(uploadData, null, 2)}</pre>
                    </code>
                )}
            </form>
        </Box>
    );
};

export default Photos;
