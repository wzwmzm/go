import QtQuick 2.7
import QtQuick.Controls 2.1


ApplicationWindow {
    id: window

    visible: true
    title: "Hello World Example"
    minimumWidth: 400
    minimumHeight: 400

    Column {
        id: column
        anchors.centerIn: parent

        TextField {
            id: input

            anchors.horizontalCenter: parent.horizontalCenter
            placeholderText: "1. write something "

        }

        Button {
            text: qsTr("2. Click me")
            anchors.horizontalCenter: parent.horizontalCenter

            onClicked: dialog.open()

        }
    }

    Dialog{

        contentWidth: window.width/2
        contentHeight: window.height/4
		
		id: dialog
        standardButtons: Dialog.Ok

        contentItem: Label{
            text: input.text
        }

    }


}
