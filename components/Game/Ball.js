import { useEffect, useState, memo } from 'react'

import { useBox, usePlane, useSphere } from '@react-three/cannon';

// import { useSelector, useDispatch } from 'react-redux';

import { useHotkeys } from 'react-hotkeys-hook';
import { BeachBall } from './BeachBall';
import { useStore } from '@/hooks/useStore';
import axios from 'axios';
import { useWallet } from '@/hooks/useWallet';
import generateRandomInteger from '@/hooks/generateRandomInteger';
import { useOfflineWallet } from '@/hooks/useOfflineWallet';

const Ball = (props) => {

    const { ball_key, activeBalls, item } = props

    const { wallet, setWallet, addTotal } = useWallet()

    const offlineWallet = useOfflineWallet(state => state.wallet);
    const setOfflineWallet = useOfflineWallet(state => state.setWallet);

    // const userReduxState = useSelector((state) => state.auth.user_details)
    const userReduxState = false

    const { balls, removeBall } = useStore()

    const startHeight = 40
    const startVelocity = 0
    const size = 1
    const angularVelocity = [0, 0, 0]

    const [ref, api] = useSphere(() => ({
        mass: 0.1,
        position: [generateRandomInteger(-3, 3), startHeight, 3],
        args: [size, size, size],
        restitution: 0.8,
        velocity: [0, startVelocity, 0],
        angularVelocity: angularVelocity,
        userData: {
            type: item.type,
        },
        onCollide: (e) => {

            if (e?.contact) {
                // const normal = e.contact.ni; // Normal of the collision
                // const impulse = normal.map((n) => n * 1.5); // Apply extra force based on collision normal
                // api.applyImpulse(impulse, [0, 0, 0]); // Apply impulse to sphere's center                
            }

            if (e?.body?.userData?.isPeg) {
                const cn = e.contact.contactNormal
                api.velocity.set(cn[0] * 10, cn[1] * 10, cn[2] * 10)
            }

            if (e?.body?.userData?.score || e?.body?.userData?.score === 0) {

                // console.log("score", e?.body?.userData?.score, item.type, ball_key)

                if (item.type === "Online") {

                    if (userReduxState?._id) {

                        axios.post('/api/user/community/games/plinko/ball/score', {
                            ball_key,
                            score: e?.body?.userData?.score
                        })
                            .then(response => {

                                console.log(response.data)
                                setWallet({
                                    ...wallet,
                                    total: response.data.total
                                })
                                removeBall(ball_key)

                            })
                            .catch(response => {
                                console.log(response.data)
                            })

                    } else {

                        // No offline in online plays
                        // addTotal(100)
                        // removeBall(ball_key)

                    }

                }

                if (item.type === "Offline") {

                    const offlineWallet = useOfflineWallet.getState().wallet;

                    setOfflineWallet({
                        ...offlineWallet,
                        total: offlineWallet?.total + (10 * e?.body?.userData?.score)
                    })

                    removeBall(ball_key)

                }


            }

        }
        // angularDamping: 0.5
    }));

    // usePlane(() => ({
    //     position: [0, -25, 0],
    //     rotation: [-Math.PI / 2, 0, 0],
    //     onCollide: (e) => {

    //         console.log("score", e?.body?.userData?.score)

    //         if (e?.body?.userData?.ballKey == ball_key) {

    //             console.log(e?.body?.userData, ball_key)

    //             if (userReduxState?._id) {

    //                 axios.post('/api/user/community/games/plinko/ball/score', {
    //                     ball_key,
    //                 })
    //                     .then(response => {

    //                         console.log(response.data)
    //                         setWallet({
    //                             ...wallet,
    //                             total: response.data.total
    //                         })
    //                         removeBall(ball_key)

    //                     })
    //                     .catch(response => {
    //                         console.log(response.data)
    //                     })

    //             } else {

    //                 addTotal(100)
    //                 removeBall(ball_key)

    //             }

    //         }

    //     }
    // }))

    // useHotkeys('1', () => {
    //     api.position.set(0, startHeight, 3); // Set the position to the starting location
    //     api.velocity.set(0, startVelocity, 0); // Reset the velocity
    //     api.angularVelocity.set(angularVelocity);
    // });

    // useEffect(() => {
    //     // Access the mesh object from the ref
    //     const mesh = ref.current;

    //     // Set userData property with your data
    //     mesh.userData.ballKey = ball_key;

    // }, [api, ref, ball_key]);

    useEffect(() => {

        // Clean up the velocity when component unmounts
        return () => {
            api.velocity.set(0, startVelocity, 0);
        };

    }, [api]);

    return (
        <mesh ref={ref} castShadow>
            <sphereGeometry args={[size, 10, 10]} />
            <BeachBall />
            {/* <meshStandardMaterial color="red" /> */}
        </mesh>
    );
};

// export default Ball;

const arePropsEqual = (prevProps, nextProps) => {
    // Compare all props for equality
    return JSON.stringify(prevProps) === JSON.stringify(nextProps);
};

const MemoizedBall = memo(Ball, arePropsEqual);

export default MemoizedBall