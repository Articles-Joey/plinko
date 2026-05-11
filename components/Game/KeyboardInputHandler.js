import { useEffect } from "react";
import { useControlsStore } from "@/hooks/useControlsStore";
import { useStore } from "@/hooks/useStore";
import { useHotkeys } from "react-hotkeys-hook";
import { useOfflineWallet } from "@/hooks/useOfflineWallet";
import { add, format } from "date-fns";

export default function KeyboardInputHandler() {

    const mappings = useControlsStore((s) => s.mappings);

    const reloadScene = useStore(state => state.reloadScene)
    const addBall = useStore(state => state.addBall);

    // const wallet = useOfflineWallet(state => state.wallet);
    const setOfflineWallet = useOfflineWallet(state => state.setWallet);

    useHotkeys('r', () => {
        console.log("Reload Scene!")
        reloadScene()
    });

    useEffect(() => {
        // Build reverse map: bound key -> action name
        const keyToAction = Object.fromEntries(
            Object.entries(mappings)
                .filter(([, key]) => key != null)
                .map(([action, key]) => [key.toLowerCase(), action])
        );

        const handleKeyDown = (e) => {

            const action = keyToAction[e.key.toLowerCase()];
            const offlineWallet = useOfflineWallet.getState().wallet;

            if (action) {
                console.log(`Action Triggered: ${action}`);

                switch (action) {
                    case "Redeem Online Ball":
                        // Add Online Ball logic here
                        break;
                    case "Claim Online Points":
                        // Add Claim Online Points logic here
                        break;
                    case "Redeem Offline Ball":


                        const betAmount = useStore.getState().betAmount;
                        // const setWallet = useOfflineWallet.getState().setWallet;

                        console.log("wallet", offlineWallet, "betAmount", betAmount)

                        // Add Offline Ball logic here
                        addBall({
                            type: "Offline"
                        })
                        setOfflineWallet({
                            ...offlineWallet,
                            total: (offlineWallet?.total || 0) - betAmount
                        })

                        break;
                    case "Claim Offline Points":
                        // Add Claim Offline Points logic here

                        const lastClaim = useOfflineWallet.getState().lastClaim;
                        const setLastClaim = useOfflineWallet.getState().setLastClaim;
                        // const setWallet = useOfflineWallet.getState().setWallet;

                        if (
                            lastClaim
                            &&
                            new Date(lastClaim) < add(new Date(), { days: 1 })
                        ) {
                            alert("You can only claim once every 24 hours. Please try again later.");
                            return;
                        }

                        setOfflineWallet({
                            ...offlineWallet,
                            total: (offlineWallet?.total || 0) + 100
                        })

                        setLastClaim(new Date())

                        break;
                    default:
                        break;
                }
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [mappings]);

    return null;
}