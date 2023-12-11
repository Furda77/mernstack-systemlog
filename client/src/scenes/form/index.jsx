import React, { useState } from 'react';
import { Box, Button, Snackbar, TextField, Typography, Grid } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import Header from 'components/Header';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Form = () => {
    const [formData, setFormData] = useState({
        system_id: '',
        createdAt: '',
        cpu_usage_percent: '',
        load_avg_1min: '',
        load_avg_5min: '',
        load_avg_15min: '',
        logged_in_users: '',
        uptime: '',
        memory_utilization_percent: '',
        number_of_processes: '',
    });

    const [notificationOpen, setNotificationOpen] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Ověřuje formát dat před odesláním
        const formattedData = {
            ...formData,
            cpu_usage_percent: parseFloat(formData.cpu_usage_percent),
            load_avg_1min: parseFloat(formData.load_avg_1min),
            load_avg_5min: parseFloat(formData.load_avg_5min),
            load_avg_15min: parseFloat(formData.load_avg_15min),
            memory_utilization_percent: parseFloat(formData.memory_utilization_percent),
            number_of_processes: parseInt(formData.number_of_processes),
            createdAt: formData.createdAt,
        };

        const postURL = 'http://localhost:5001/client/systemdata';

        try {
            const response = await fetch(postURL, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formattedData),
            });

            if (response.ok) {
                setNotificationOpen(true); //Notifikace při úspěšném odeslání
                setFormData({ // Resetování všech políček po odeslání
                    system_id: '',
                    createdAt: '',
                    cpu_usage_percent: '',
                    load_avg_1min: '',
                    load_avg_5min: '',
                    load_avg_15min: '',
                    logged_in_users: '',
                    uptime: '',
                    memory_utilization_percent: '',
                    number_of_processes: '',
                });
            } else {
                console.error('Nepodařilo se nám odeslat data do MongoDB');
            }
        } catch (error) {
            console.error('Error sending data:', error);
        }
    };

    const handleNotificationClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setNotificationOpen(false);
    };


    return (
        <Box m="1.5rem 2.5rem">
            <Header title="Vložení dat" subtitle="Zde můžete přidat nová data do databáze" />
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <form onSubmit={handleSubmit}>
                        <Typography variant="h5" gutterBottom m="2rem 0 1rem 0">
                            Systémová data
                        </Typography>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    label="ID systému"
                                    name="system_id"
                                    value={formData.system_id}
                                    onChange={handleChange}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="Vytížení CPU v %"
                                    name="cpu_usage_percent"
                                    value={formData.cpu_usage_percent}
                                    onChange={handleChange}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="Průměrná doba načítaní na jednu minutu"
                                    name="load_avg_1min"
                                    value={formData.load_avg_1min}
                                    onChange={handleChange}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="Průměrná doba načítaní na pět minut"
                                    name="load_avg_5min"
                                    value={formData.load_avg_5min}
                                    onChange={handleChange}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="Průměrná doba načítaní na patnáct minut"
                                    name="load_avg_15min"
                                    value={formData.load_avg_15min}
                                    onChange={handleChange}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="Uptime"
                                    name="uptime"
                                    value={formData.uptime}
                                    onChange={handleChange}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="Vytížení paměti v %"
                                    name="memory_utilization_percent"
                                    value={formData.memory_utilization_percent}
                                    onChange={handleChange}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="Počet běžících procesů"
                                    name="number_of_processes"
                                    value={formData.number_of_processes}
                                    onChange={handleChange}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Button type="submit" variant="contained" color="primary" fullWidth>
                                    Odeslat
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </Grid>
            </Grid>
            <Snackbar
                open={notificationOpen}
                autoHideDuration={3000}
                onClose={handleNotificationClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert onClose={handleNotificationClose} severity="success">
                    Data se úspěšně odeslaly.
                </Alert>
            </Snackbar>
        </Box>
    );
}

export default Form;

