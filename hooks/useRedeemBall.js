import { useStore } from '@/hooks/useStore'
import { useWallet } from '@/hooks/useWallet'
import { useOfflineWallet } from '@/hooks/useOfflineWallet'
import useUserToken from '@articles-media/articles-dev-box/useUserToken'

export function useRedeemBall() {
    const { data: userToken } = useUserToken("3017")

    const { wallet, setWallet } = useWallet()
    const offlineWallet = useOfflineWallet(state => state.wallet)
    const setOfflineWallet = useOfflineWallet(state => state.setWallet)

    const addBall = useStore(state => state.addBall)
    const betAmount = useStore(state => state.betAmount)

    function redeemBall(offline) {
        if (offline) {
            addBall({ type: 'Offline' })
            setOfflineWallet({
                ...offlineWallet,
                total: (offlineWallet?.total || 0) - betAmount
            })
        } else {
            fetch("/api/user/ball/redeem", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "x-articles-api-key": userToken
                },
                body: JSON.stringify({ betAmount })
            })
                .then(async (res) => {
                    if (!res.ok) {
                        const error = await res.text()
                        throw new Error(error || 'Fetch error')
                    }
                    return res.json()
                })
                .then(data => {
                    setWallet({ ...wallet, total: data.total })
                    addBall({ type: "Online", betAmount })
                })
                .catch(error => {
                    console.log(error)
                })
        }
    }

    return redeemBall
}
