import apiService from '../services/apiService';

describe('Journal API Tests', () => {
    let token;
    let journalEntryId;

    beforeAll(async () => {
        // Login and get token
        const response = await apiService.login({
            email: 'test@example.com',
            password: 'testpassword'
        });
        token = response.token;
    });

    test('Create Journal Entry', async () => {
        const entryData = {
            title: 'Test Entry',
            content: 'This is a test journal entry',
            mood: 'happy'
        };

        const response = await apiService.createJournalEntry(entryData);
        expect(response).toHaveProperty('_id');
        journalEntryId = response._id;
    });

    test('Get Journal Entries', async () => {
        const response = await apiService.getJournalEntries();
        expect(Array.isArray(response)).toBe(true);
    });

    test('Update Journal Entry', async () => {
        const updateData = {
            content: 'Updated content'
        };

        const response = await apiService.updateJournalEntry(journalEntryId, updateData);
        expect(response.content).toBe('Updated content');
    });

    test('Delete Journal Entry', async () => {
        const response = await apiService.deleteJournalEntry(journalEntryId);
        expect(response.message).toBe('Entry removed');
    });
});