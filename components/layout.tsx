import { Box, Image, Text, useBreakpoint, useBreakpointValue } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { useEffect, useState } from "react";

export const Layout = ({children}: { children: React.ReactElement }) => {
    const menus = ['MESSAGE', 'PHOTOS'];
    const router = useRouter();
    const date =new Date('2022-03-05');
    const nowDate = new Date();
    // @ts-ignore
    const day = date-nowDate
    const weddingDay=parseInt(String(day / 1000 / 60 / 60 / 24))
    const [mounted, setMounted] = useState(false)
    const movePage = (page: string) => {
        if (page === 'HOME') router.push('/', undefined, {scroll: false});
        else router.push(`/${page.toLowerCase()}`, undefined, {scroll: false});
    };


    const breakpoint = useBreakpointValue({
            base: (<>
                    <Text mt={'15px'} fontSize={'20px'} fontFamily={"'Cutive Mono', monospace;"}>
                        March 5,2022
                    </Text>
                    <Text mt={'15px'} style={{fontSize: '20px'}} fontSize={'20px !important'}
                          fontFamily={"'Cutive Mono', monospace;"}>
                        Tokyo Suginami Church
                    </Text>
                </>
            ),
            sm: (
                <>
                    <Text mt={'15px'} fontSize={'20px'} fontFamily={"'Cutive Mono', monospace;"}>
                        March 5,2022
                    </Text>
                    <Text mt={'15px'} style={{fontSize: '20px'}} fontSize={'20px !important'}
                          fontFamily={"'Cutive Mono', monospace;"}>
                        Tokyo Suginami Church
                    </Text>
                </>
            ),
            md: (<Text mt={'15px'} fontSize={'28px'} fontFamily={"'Cutive Mono', monospace;"}>
                March 5,2022 Tokyo Suginami Church
            </Text>)
        }
    )

    useEffect(()=>{
        setMounted(true)
    },[])

    return (
        <>
            <Head>
                <title>正基さん、さとちゃん、結婚おめでとう!</title>
                <meta name='description' content='Upload your image to Cloudinary!'/>
                <link rel='icon' href='/favicon.ico'/>
            </Head>
            <Box
                minHeight={'100vh'}
                display={'flex'}
                flexDirection={'column'}
                alignItems={'center'}
                backgroundColor={'#FFFAF1'}
            >
                <Image
                    src={
                        'https://media-api.xogrp.com/images/3f93e2fc-fe94-4940-9bfe-7923d13e6a5c~rt_auto-rs_1024.h?ordering=explicit'
                    }
                />
                <Text mt={'25px'} fontSize={['55px','63px']} fontFamily={"'Euphoria Script', cursive;"}>
                    Masaki & Satoko
                </Text>
                <Image width={'60%'} borderRadius={'1px'} src={'/main.png'}/>
                {mounted && breakpoint}
                <Text mt={'5px'} fontSize={'30px'} fontFamily={"'Cutive Mono', monospace;"}>
                    {weddingDay} Days To Go
                </Text>
                <Box mt={'50px'} display={'flex'} width={'50%'} justifyContent={'space-evenly'}>
                    {menus.map((v) => (
                        <Box
                            onClick={() => movePage(v)}
                            cursor={'pointer'}
                            key={v}
                            height={'30px'}
                            boxSizing={'border-box'}
                        >
                            <Text
                                fontSize={['18px', '25px']}
                                display={'inline-block'}
                                fontFamily={"'Shadows Into Light', cursive;"}
                                _hover={{borderBottom: '2px solid black'}}
                                transition={'border 0.5s, border-width 0.01s'}
                            >
                                {v}
                            </Text>
                            <Box width={'100%'}/>
                        </Box>
                    ))}
                </Box>
                <Box
                    width={'70%'}
                    pt={'70px'}
                    display={'flex'}
                    flexDirection={'column'}
                    alignItems={'center'}
                >
                    {children}
                </Box>
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

                <Image
                    mt={'80px'}
                    src={
                        'https://media-api.xogrp.com/images/f40efb40-4576-4cf3-9e82-58ead3c4ac55~rt_auto-rs_1536.h?ordering=explicit'
                    }
                />
            </Box>
        </>
    );
};
