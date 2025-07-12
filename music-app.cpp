#include <iostream>
#include <string>

using namespace std;

// Song node structure for doubly linked list
struct Song {
    string title;
    string artist;
    Song* next;
    Song* prev;
    
    Song(string t, string a) : title(t), artist(a), next(nullptr), prev(nullptr) {}
};

class Playlist {
private:
    Song* head;
    Song* current;
    int size;

public:
    Playlist() : head(nullptr), current(nullptr), size(0) {}

    // Add a song to the playlist
    void addSong(string title, string artist) {
        Song* newSong = new Song(title, artist);
        
        if (!head) {
            head = newSong;
            current = head;
        } else {
            Song* temp = head;
            while (temp->next) {
                temp = temp->next;
            }
            temp->next = newSong;
            newSong->prev = temp;
        }
        size++;
    }

    // Play next song
    void nextSong() {
        if (current && current->next) {
            current = current->next;
            playCurrent();
        } else {
            cout << "No next song available. End of playlist." << endl;
        }
    }

    // Play previous song
    void prevSong() {
        if (current && current->prev) {
            current = current->prev;
            playCurrent();
        } else {
            cout << "No previous(song available. Start of playlist." << endl;
        }
    }

    // Play current song
    void playCurrent() {
        if (current) {
            cout << "Now playing: " << current->title << " by " << current->artist << endl;
        } else {
            cout << "Playlist is empty." << endl;
        }
    }

    // Display playlist
    void displayPlaylist() {
        if (!head) {
            cout << "Playlist is empty." << endl;
            return;
        }

        Song* temp = head;
        int index = 1;
        cout << "\nPlaylist:" << endl;
        while (temp) {
            cout << index++ << ". " << temp->title << " by " << temp->artist;
            if (temp == current) cout << " (Currently Playing)";
            cout << endl;
            temp = temp->next;
        }
    }

    // Destructor to free memory
    ~Playlist() {
        Song* current = head;
        while (current) {
            Song* next = current->next;
            delete current;
            current = next;
        }
    }
};

int main() {
    Playlist playlist;
    
    // Add sample songs
    playlist.addSong("Shape of You", "Ed Sheeran");
    playlist.addSong("Bohemian Rhapsody", "Queen");
    playlist.addSong("Billie Jean", "Michael Jackson");
    playlist.addSong("Hey Jude", "The Beatles");

    int choice;
    do {
        playlist.displayPlaylist();
        cout << "\nMenu:\n1. Play Next\n2. Play Previous\n3. Exit\nEnter choice: ";
        cin >> choice;
        cin.ignore(); // Clear buffer

        switch (choice) {
            case 1:
                playlist.nextSong();
                break;
            case 2:
                playlist.prevSong();
                break;
            case 3:
                cout << "Exiting..." << endl;
                break;
            default:
                cout << "Invalid choice!" << endl;
        }
    } while (choice != 3);

    return 0;
}