import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

const NotificationCard = ({ date, message, notification_id, title, onDelete }) => {
    return (
        <View style={styles.card}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.message}>{message}</Text>
            <Text style={styles.date}>{date}</Text>
            <TouchableOpacity style={styles.button} onPress={() => onDelete(notification_id)}>
                <Text style={styles.buttonText}>Delete</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        padding: 20,
        marginVertical: 10,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    message: {
        fontSize: 16,
        marginBottom: 10,
    },
    date: {
        fontSize: 12,
        color: '#888',
        marginBottom: 10,
    },
    button: {
        backgroundColor: '#ff5252',
        paddingVertical: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
});

export default NotificationCard;