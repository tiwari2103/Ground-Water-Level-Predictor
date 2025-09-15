import React, { useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { getGroundwaterAdvice } from '../utils/chatbotService';
import html2pdf from 'html2pdf.js';
import { Button, TextField, Typography, Card, CircularProgress } from '@mui/material';

function Chatbot() {
    const location = useLocation();
    const initialMbgl = location.state?.mbgl || "";
    const [mbgl, setMbgl] = useState(initialMbgl);
    const [responseHtml, setResponseHtml] = useState("");
    const [loading, setLoading] = useState(false);
    const reportRef = useRef(null);

    const handleGetAdvice = async () => {
        if (!mbgl) return;
        setLoading(true);
        try {
            const raw = await getGroundwaterAdvice(mbgl);
            const content = raw?.message?.content || raw;
            const clean = formatResponse(content);
            setResponseHtml(clean);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const formatResponse = (text) => {
        const escaped = text.replace(/</g, "&lt;").replace(/>/g, "&gt;");
        return escaped
            .split("\n")
            .map((line) => {
                if (line.startsWith("### ")) {
                    return `<h3 style="color: #2196f3; font-weight: 600; font-size: 24px; margin-bottom: 12px;">${line.replace("### ", "")}</h3>`;
                } else if (line.startsWith("- ")) {
                    return `<li style="color: #2196f3; margin-left: 24px; list-style-type: disc; font-size: 16px; margin-bottom: 8px;">${line.replace("- ", "")}</li>`;
                } else if (line.trim()) {
                    return `<p style="margin-top: 16px; color: #263238; font-size: 16px; line-height: 1.5;">${line}</p>`;
                }
                return "";
            })
            .join("");
    };

    const handleDownload = () => {
        if (!reportRef.current) return;

        const element = reportRef.current;
        const opt = {
            margin: 0.5,
            filename: `Groundwater_Advice_MBGL_${mbgl}.pdf`,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2, scrollY: 0 },
            jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
            pagebreak: { mode: ['css', 'legacy'] },
        };

        html2pdf().set(opt).from(element).save();
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f5f5f5' }}>
            <Card sx={{ maxWidth: 900, width: '100%', mx: 'auto', p: 4, bgcolor: 'background.paper', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                <Typography variant="h3" color="primary" align="center" gutterBottom>
                    Groundwater Conservation Chatbot
                </Typography>

                <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
                    <TextField
                        label="Enter MBGL value"
                        type="text"
                        value={mbgl}
                        onChange={(e) => setMbgl(e.target.value)}
                        variant="outlined"
                        fullWidth
                        sx={{ marginBottom: 2 }}
                    />
                    <Button
                        onClick={handleGetAdvice}
                        variant="contained"
                        color="primary"
                        fullWidth
                        sx={{ minWidth: 120, marginTop: 2 }}
                        disabled={loading}
                    >
                        {loading ? <CircularProgress size={24} color="inherit" /> : 'Get Advice'}
                    </Button>
                </div>

                <div style={{ flexGrow: 1, overflowY: 'auto', marginTop: '16px' }}>
                    {responseHtml && (
                        <div
                            ref={reportRef}
                            style={{
                                padding: '16px',
                                backgroundColor: '#f0f0f0',
                                borderRadius: '8px',
                                boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                                maxWidth: '100%',
                            }}
                            dangerouslySetInnerHTML={{ __html: responseHtml }}
                        ></div>
                    )}
                </div>

                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '24px', paddingBottom: '24px' }}>
                    <Button
                        onClick={handleDownload}
                        variant="contained"
                        color="secondary"
                        sx={{ minWidth: 160 }}
                    >
                        Download PDF Report
                    </Button>
                </div>
            </Card>
        </div>
    );
}

export default Chatbot;
