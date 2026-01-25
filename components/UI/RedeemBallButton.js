import { useStore } from "@/hooks/useStore";
import ArticlesButton from "./Button";
import { useWallet } from "@/hooks/useWallet";
import { useOfflineWallet } from "@/hooks/useOfflineWallet";

function RedeemBallButton({
    className,
    redeemBall,
    offline,
    sidebar
}) {

    const betAmount = useStore(state => state.betAmount);

    const onlineWallet = useWallet(state => state.wallet)
    const offlineWallet = useOfflineWallet(state => state.wallet);

    const isDisabled = (
        offline ?
            (offlineWallet.total < betAmount)
            :
            (onlineWallet.total < betAmount)
    )

    return (
        <ArticlesButton
            className={className}
            small
            disabled={isDisabled}
            onClick={() => {
                redeemBall(true)
            }}
        >

            {
                sidebar ?
                    <>
                        <span>Redeem Ball</span>
                    </>
                    :
                    <>
                        {offline ?
                            <i className="fad fa-signal-slash"></i>
                            :
                            <i className="fad fa-globe-americas"></i>
                        }

                        <span>{offline ? "Offline" : "Online"}</span>
                    </>
            }


            {/* <span className="ms-2 badge bg-dark shadow-articles">
                -{betAmount} Points
            </span> */}

        </ArticlesButton>
    )
}

export default RedeemBallButton;