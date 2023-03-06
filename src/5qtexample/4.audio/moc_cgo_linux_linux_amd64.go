package main

/*
#cgo CFLAGS: -pipe -O2 -Wall -W -D_REENTRANT -fPIC -DQT_NO_DEBUG -DQT_MULTIMEDIAWIDGETS_LIB -DQT_DESIGNER_LIB -DQT_UIPLUGIN_LIB -DQT_QUICKWIDGETS_LIB -DQT_WIDGETS_LIB -DQT_MULTIMEDIA_LIB -DQT_QUICK_LIB -DQT_GUI_LIB -DQT_QML_LIB -DQT_NETWORK_LIB -DQT_DBUS_LIB -DQT_XML_LIB -DQT_TESTLIB_LIB -DQT_CORE_LIB 
#cgo CXXFLAGS: -pipe -O2 -std=gnu++11 -Wall -W -D_REENTRANT -fPIC -DQT_NO_DEBUG -DQT_MULTIMEDIAWIDGETS_LIB -DQT_DESIGNER_LIB -DQT_UIPLUGIN_LIB -DQT_QUICKWIDGETS_LIB -DQT_WIDGETS_LIB -DQT_MULTIMEDIA_LIB -DQT_QUICK_LIB -DQT_GUI_LIB -DQT_QML_LIB -DQT_NETWORK_LIB -DQT_DBUS_LIB -DQT_XML_LIB -DQT_TESTLIB_LIB -DQT_CORE_LIB 
#cgo CXXFLAGS: -I../../qtexample -I. -I/home/wzw/software/qt/5.8/gcc_64/include -I/home/wzw/software/qt/5.8/gcc_64/include/QtMultimediaWidgets -I/home/wzw/software/qt/5.8/gcc_64/include/QtDesigner -I/home/wzw/software/qt/5.8/gcc_64/include/QtUiPlugin -I/home/wzw/software/qt/5.8/gcc_64/include/QtQuickWidgets -I/home/wzw/software/qt/5.8/gcc_64/include/QtWidgets -I/home/wzw/software/qt/5.8/gcc_64/include/QtMultimedia -I/home/wzw/software/qt/5.8/gcc_64/include/QtQuick -I/home/wzw/software/qt/5.8/gcc_64/include/QtGui -I/home/wzw/software/qt/5.8/gcc_64/include/QtQml -I/home/wzw/software/qt/5.8/gcc_64/include/QtNetwork -I/home/wzw/software/qt/5.8/gcc_64/include/QtDBus -I/home/wzw/software/qt/5.8/gcc_64/include/QtXml -I/home/wzw/software/qt/5.8/gcc_64/include/QtTest -I/home/wzw/software/qt/5.8/gcc_64/include/QtCore -I. -isystem /usr/include/libdrm -isystem /usr/include/glib-2.0 -I/usr/lib64/glib-2.0/include -I/home/wzw/software/qt/5.8/gcc_64/mkspecs/linux-g++
#cgo LDFLAGS: -Wl,-O1 -Wl,-rpath,/home/wzw/software/qt/5.8/gcc_64/lib -Wl,-rpath-link,/home/wzw/software/qt/5.8/gcc_64/lib
#cgo LDFLAGS:  -L/home/wzw/software/qt/5.8/gcc_64/lib -lQt5MultimediaWidgets -lQt5Designer -lQt5QuickWidgets -lQt5Widgets -lQt5Multimedia -lQt5Quick -lQt5Gui -lQt5Qml -lQt5Network -lQt5DBus -lQt5Xml -lQt5Test -lQt5Core -lGL -lpthread -lpulse-mainloop-glib -lpulse -lglib-2.0
*/
import "C"