export default function removeRoomHash() {
    window.location.hash = '';
    window.location.reload();
}