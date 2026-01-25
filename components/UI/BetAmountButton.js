"use client"
import ArticlesButton from '@/components/UI/Button';
import { useOfflineWallet } from '@/hooks/useOfflineWallet';
import { useStore } from '@/hooks/useStore';
import { useWallet } from '@/hooks/useWallet';
import { Dropdown, DropdownButton } from 'react-bootstrap';

export default function BetAmountButton() {

    const offlineWallet = useOfflineWallet(state => state.wallet);
    const onlineWallet = useWallet(state => state.wallet);

    const betAmount = useStore(state => state.betAmount);
    const setBetAmount = useStore(state => state.setBetAmount);

    return (
        <DropdownButton
            variant="articles w-100"
            size='sm'
            id="dropdown-basic-button"
            className="dropdown-articles"
            title={
                <span>
                    <i className="fad fa-money-bill-wave"></i>
                    <span>Bet: {betAmount}</span>

                    {/* <span>{debug ? 'On' : 'Off'}</span> */}
                </span>
            }
        >

            <div className=''>
                <ArticlesButton
                    // small
                    className="w-50"
                    onClick={() => {
                        setBetAmount(betAmount - 1)
                        // reloadScene()
                    }}
                >
                    <i className="fad fa-caret-square-down"></i>
                </ArticlesButton>

                <ArticlesButton
                    // small
                    className="w-50"
                    onClick={() => {
                        setBetAmount(betAmount + 1)
                        // reloadScene()
                    }}
                >
                    <i className="fad fa-caret-square-up"></i>
                </ArticlesButton>
            </div>

            <div style={{ maxHeight: '600px', overflowY: 'auto', width: '200px' }}>

                {[
                    {
                        name: '$5',
                        amount: 5
                    },
                    {
                        name: '$10',
                        amount: 10
                    },
                    {
                        name: '$50',
                        amount: 50
                    },
                    {
                        name: '$100',
                        amount: 100
                    },
                    ...(offlineWallet?.total || onlineWallet?.total || 0) >= 500 ? [
                        {
                            name: '$500',
                            amount: 500
                        },
                        {
                            name: '$1,000',
                            amount: 1000
                        },
                        {
                            name: '$2,000',
                            amount: 2000
                        }
                    ] : [],
                ]
                    .map(location =>
                        <Dropdown.Item
                            key={location.name}
                            onClick={() => {
                                setBetAmount(location.amount)
                            }}
                            className="d-flex justify-content-between"
                        >
                            {location.name}
                        </Dropdown.Item>
                    )}

            </div>

        </DropdownButton>
    )

}