"use client"
import ArticlesButton from '@/components/UI/Button';
import { useOfflineWallet } from '@/hooks/useOfflineWallet';
import { useStore } from '@/hooks/useStore';
import { useWallet } from '@/hooks/useWallet';
import { Dropdown, DropdownButton, Form } from 'react-bootstrap';

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
        
            <div style={{ maxHeight: '600px', overflowY: 'auto', width: '200px' }}>

                <div className='p-2 d-flex'>
                    <Form.Control
                        type="number"
                        placeholder="Custom"
                        size="sm"
                        value={betAmount}
                        className="me-1"
                        onChange={(e) => {
                            const val = parseInt(e.target.value);
                            if (!isNaN(val)) {
                                setBetAmount(val);
                            } else if (e.target.value === '') {
                                setBetAmount('');
                            }
                        }}
                    />
                    <ArticlesButton
                        className="px-2"
                        onClick={() => {
                            setBetAmount(Math.max(1, (parseInt(betAmount) || 0) - 1))
                        }}
                    >
                        <i className="fad fa-caret-square-down me-0"></i>
                    </ArticlesButton>

                    <ArticlesButton
                        className="px-2"
                        onClick={() => {
                            setBetAmount((parseInt(betAmount) || 0) + 1)
                        }}
                    >
                        <i className="fad fa-caret-square-up me-0"></i>
                    </ArticlesButton>
                </div>

                <Dropdown.Divider />

                {[
                    { name: '$1', amount: 1 },
                    { name: '$5', amount: 5 },
                    { name: '$10', amount: 10 },
                    { name: '$50', amount: 50 },
                    { name: '$100', amount: 100 },
                    { name: '$250', amount: 250 },
                    { name: '$500', amount: 500 },
                    { name: '$1,000', amount: 1000 },
                    { name: '$2,500', amount: 2500 },
                    { name: '$5,000', amount: 5000 },
                ]
                    .filter(item => (offlineWallet?.total || onlineWallet?.total || 0) >= item.amount)
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