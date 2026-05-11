import { useState, useEffect, useCallback } from 'react';
import ArticlesButton from "./Button";
import { useControlsStore } from '../../hooks/useControlsStore';

const ACTIONS = [
    { action: 'Redeem Online Ball' },
    { action: 'Claim Online Points' },
    { action: 'Redeem Offline Ball' },
    { action: 'Claim Offline Points' },
];

export default function ControlsPanel() {
    const mappings = useControlsStore((s) => s.mappings);
    const setMapping = useControlsStore((s) => s.setMapping);
    const clearMapping = useControlsStore((s) => s.clearMapping);

    const [listening, setListening] = useState(null); // action name being rebound

    const startListening = (action) => setListening(action);
    const cancelListening = () => setListening(null);

    const handleKeyDown = useCallback((e) => {
        if (!listening) return;
        e.preventDefault();
        if (e.key === 'Escape') {
            cancelListening();
            return;
        }

        if (e.key.toLowerCase() === 'r') {
            alert("'R' is reserved for Reload Scene and cannot be rebound.");
            return;
        }

        setMapping(listening, e.key);
        setListening(null);
    }, [listening, setMapping]);

    useEffect(() => {
        if (!listening) return;
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [listening, handleKeyDown]);

    return (
        <div className="border p-0 mb-3">
            {listening && (
                <div
                    className="p-2 text-center small"
                    style={{ cursor: 'pointer' }}
                    onClick={cancelListening}
                >
                    Press any key for <strong>{listening}</strong> &mdash; or click here to cancel
                </div>
            )}
            {ACTIONS.map(({ action }) => {
                const key = mappings[action];
                const isListening = listening === action;
                return (
                    <div key={action}>
                        <div className="flex-header border-bottom p-1">

                            <div>
                                <div>{action}</div>
                            </div>

                            <div className="d-flex align-items-center gap-1">

                                <div className={`badge badge-hover me-1 ${isListening ? 'bg-warning text-dark' : 'bg-articles'}`}>
                                    {isListening ? '...' : (key ?? 'None')}
                                </div>

                                {key && !isListening && (
                                    <ArticlesButton
                                        small
                                        onClick={() => clearMapping(action)}
                                    >
                                        Clear
                                    </ArticlesButton>
                                )}

                                <ArticlesButton
                                    small
                                    active={isListening}
                                    onClick={() => isListening ? cancelListening() : startListening(action)}
                                >
                                    {isListening ? 'Cancel' : 'Change Key'}
                                </ArticlesButton>

                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}