

#define protected public
#define private public

#include "moc.h"
#include "_cgo_export.h"

#include <QAction>
#include <QActionEvent>
#include <QByteArray>
#include <QCamera>
#include <QCameraImageCapture>
#include <QChildEvent>
#include <QCloseEvent>
#include <QContextMenuEvent>
#include <QDBusPendingCall>
#include <QDBusPendingCallWatcher>
#include <QDrag>
#include <QDragEnterEvent>
#include <QDragLeaveEvent>
#include <QDragMoveEvent>
#include <QDropEvent>
#include <QEvent>
#include <QExtensionFactory>
#include <QExtensionManager>
#include <QFocusEvent>
#include <QGraphicsObject>
#include <QGraphicsWidget>
#include <QHideEvent>
#include <QIODevice>
#include <QIcon>
#include <QInputMethod>
#include <QInputMethodEvent>
#include <QKeyEvent>
#include <QLayout>
#include <QList>
#include <QMediaPlaylist>
#include <QMediaRecorder>
#include <QMetaMethod>
#include <QMouseEvent>
#include <QMoveEvent>
#include <QObject>
#include <QOffscreenSurface>
#include <QPaintDevice>
#include <QPaintDeviceWindow>
#include <QPaintEngine>
#include <QPaintEvent>
#include <QPdfWriter>
#include <QPoint>
#include <QQuickItem>
#include <QRadioData>
#include <QResizeEvent>
#include <QShowEvent>
#include <QSignalSpy>
#include <QSize>
#include <QString>
#include <QTabletEvent>
#include <QTime>
#include <QTimer>
#include <QTimerEvent>
#include <QVariant>
#include <QWheelEvent>
#include <QWidget>
#include <QWindow>


class Widget: public QWidget
{
Q_OBJECT
public:
	Widget(QWidget *parent = Q_NULLPTR, Qt::WindowFlags fo = Qt::WindowFlags()) : QWidget(parent, fo) {qRegisterMetaType<quintptr>("quintptr");Widget_Widget_QRegisterMetaType();Widget_Widget_QRegisterMetaTypes();callbackWidget_Constructor(this);};
	bool close() { return callbackWidget_Close(this) != 0; };
	bool event(QEvent * event) { return callbackWidget_Event(this, event) != 0; };
	bool focusNextPrevChild(bool next) { return callbackWidget_FocusNextPrevChild(this, next) != 0; };
	bool nativeEvent(const QByteArray & eventType, void * message, long * result) { return callbackWidget_NativeEvent(this, const_cast<QByteArray*>(&eventType), message, *result) != 0; };
	void actionEvent(QActionEvent * event) { callbackWidget_ActionEvent(this, event); };
	void changeEvent(QEvent * event) { callbackWidget_ChangeEvent(this, event); };
	void closeEvent(QCloseEvent * event) { callbackWidget_CloseEvent(this, event); };
	void contextMenuEvent(QContextMenuEvent * event) { callbackWidget_ContextMenuEvent(this, event); };
	void Signal_CustomContextMenuRequested(const QPoint & pos) { callbackWidget_CustomContextMenuRequested(this, const_cast<QPoint*>(&pos)); };
	void dragEnterEvent(QDragEnterEvent * event) { callbackWidget_DragEnterEvent(this, event); };
	void dragLeaveEvent(QDragLeaveEvent * event) { callbackWidget_DragLeaveEvent(this, event); };
	void dragMoveEvent(QDragMoveEvent * event) { callbackWidget_DragMoveEvent(this, event); };
	void dropEvent(QDropEvent * event) { callbackWidget_DropEvent(this, event); };
	void enterEvent(QEvent * event) { callbackWidget_EnterEvent(this, event); };
	void focusInEvent(QFocusEvent * event) { callbackWidget_FocusInEvent(this, event); };
	void focusOutEvent(QFocusEvent * event) { callbackWidget_FocusOutEvent(this, event); };
	void hide() { callbackWidget_Hide(this); };
	void hideEvent(QHideEvent * event) { callbackWidget_HideEvent(this, event); };
	void inputMethodEvent(QInputMethodEvent * event) { callbackWidget_InputMethodEvent(this, event); };
	void keyPressEvent(QKeyEvent * event) { callbackWidget_KeyPressEvent(this, event); };
	void keyReleaseEvent(QKeyEvent * event) { callbackWidget_KeyReleaseEvent(this, event); };
	void leaveEvent(QEvent * event) { callbackWidget_LeaveEvent(this, event); };
	void lower() { callbackWidget_Lower(this); };
	void mouseDoubleClickEvent(QMouseEvent * event) { callbackWidget_MouseDoubleClickEvent(this, event); };
	void mouseMoveEvent(QMouseEvent * event) { callbackWidget_MouseMoveEvent(this, event); };
	void mousePressEvent(QMouseEvent * event) { callbackWidget_MousePressEvent(this, event); };
	void mouseReleaseEvent(QMouseEvent * event) { callbackWidget_MouseReleaseEvent(this, event); };
	void moveEvent(QMoveEvent * event) { callbackWidget_MoveEvent(this, event); };
	void paintEvent(QPaintEvent * event) { callbackWidget_PaintEvent(this, event); };
	void raise() { callbackWidget_Raise(this); };
	void repaint() { callbackWidget_Repaint(this); };
	void resizeEvent(QResizeEvent * event) { callbackWidget_ResizeEvent(this, event); };
	void setDisabled(bool disable) { callbackWidget_SetDisabled(this, disable); };
	void setEnabled(bool vbo) { callbackWidget_SetEnabled(this, vbo); };
	void setFocus() { callbackWidget_SetFocus2(this); };
	void setHidden(bool hidden) { callbackWidget_SetHidden(this, hidden); };
	void setStyleSheet(const QString & styleSheet) { QByteArray t728ae7 = styleSheet.toUtf8(); Moc_PackedString styleSheetPacked = { const_cast<char*>(t728ae7.prepend("WHITESPACE").constData()+10), t728ae7.size()-10 };callbackWidget_SetStyleSheet(this, styleSheetPacked); };
	void setVisible(bool visible) { callbackWidget_SetVisible(this, visible); };
	void setWindowModified(bool vbo) { callbackWidget_SetWindowModified(this, vbo); };
	void setWindowTitle(const QString & vqs) { QByteArray tda39a3 = vqs.toUtf8(); Moc_PackedString vqsPacked = { const_cast<char*>(tda39a3.prepend("WHITESPACE").constData()+10), tda39a3.size()-10 };callbackWidget_SetWindowTitle(this, vqsPacked); };
	void show() { callbackWidget_Show(this); };
	void showEvent(QShowEvent * event) { callbackWidget_ShowEvent(this, event); };
	void showFullScreen() { callbackWidget_ShowFullScreen(this); };
	void showMaximized() { callbackWidget_ShowMaximized(this); };
	void showMinimized() { callbackWidget_ShowMinimized(this); };
	void showNormal() { callbackWidget_ShowNormal(this); };
	void tabletEvent(QTabletEvent * event) { callbackWidget_TabletEvent(this, event); };
	void update() { callbackWidget_Update(this); };
	void updateMicroFocus() { callbackWidget_UpdateMicroFocus(this); };
	void wheelEvent(QWheelEvent * event) { callbackWidget_WheelEvent(this, event); };
	void Signal_WindowIconChanged(const QIcon & icon) { callbackWidget_WindowIconChanged(this, const_cast<QIcon*>(&icon)); };
	void Signal_WindowTitleChanged(const QString & title) { QByteArray t3c6de1 = title.toUtf8(); Moc_PackedString titlePacked = { const_cast<char*>(t3c6de1.prepend("WHITESPACE").constData()+10), t3c6de1.size()-10 };callbackWidget_WindowTitleChanged(this, titlePacked); };
	QPaintEngine * paintEngine() const { return static_cast<QPaintEngine*>(callbackWidget_PaintEngine(const_cast<void*>(static_cast<const void*>(this)))); };
	QSize minimumSizeHint() const { return *static_cast<QSize*>(callbackWidget_MinimumSizeHint(const_cast<void*>(static_cast<const void*>(this)))); };
	QSize sizeHint() const { return *static_cast<QSize*>(callbackWidget_SizeHint(const_cast<void*>(static_cast<const void*>(this)))); };
	QVariant inputMethodQuery(Qt::InputMethodQuery query) const { return *static_cast<QVariant*>(callbackWidget_InputMethodQuery(const_cast<void*>(static_cast<const void*>(this)), query)); };
	bool hasHeightForWidth() const { return callbackWidget_HasHeightForWidth(const_cast<void*>(static_cast<const void*>(this))) != 0; };
	int heightForWidth(int w) const { return callbackWidget_HeightForWidth(const_cast<void*>(static_cast<const void*>(this)), w); };
	int metric(QPaintDevice::PaintDeviceMetric m) const { return callbackWidget_Metric(const_cast<void*>(static_cast<const void*>(this)), m); };
	bool eventFilter(QObject * watched, QEvent * event) { return callbackWidget_EventFilter(this, watched, event) != 0; };
	void childEvent(QChildEvent * event) { callbackWidget_ChildEvent(this, event); };
	void connectNotify(const QMetaMethod & sign) { callbackWidget_ConnectNotify(this, const_cast<QMetaMethod*>(&sign)); };
	void customEvent(QEvent * event) { callbackWidget_CustomEvent(this, event); };
	void deleteLater() { callbackWidget_DeleteLater(this); };
	void Signal_Destroyed(QObject * obj) { callbackWidget_Destroyed(this, obj); };
	void disconnectNotify(const QMetaMethod & sign) { callbackWidget_DisconnectNotify(this, const_cast<QMetaMethod*>(&sign)); };
	void Signal_ObjectNameChanged(const QString & objectName) { QByteArray taa2c4f = objectName.toUtf8(); Moc_PackedString objectNamePacked = { const_cast<char*>(taa2c4f.prepend("WHITESPACE").constData()+10), taa2c4f.size()-10 };callbackWidget_ObjectNameChanged(this, objectNamePacked); };
	void timerEvent(QTimerEvent * event) { callbackWidget_TimerEvent(this, event); };
	
signals:
public slots:
private:
};

Q_DECLARE_METATYPE(Widget*)


void Widget_Widget_QRegisterMetaTypes() {
}

class XYSeriesIODevice: public QIODevice
{
Q_OBJECT
public:
	XYSeriesIODevice(QObject *parent) : QIODevice(parent) {qRegisterMetaType<quintptr>("quintptr");XYSeriesIODevice_XYSeriesIODevice_QRegisterMetaType();XYSeriesIODevice_XYSeriesIODevice_QRegisterMetaTypes();callbackXYSeriesIODevice_Constructor(this);};
	XYSeriesIODevice() : QIODevice() {qRegisterMetaType<quintptr>("quintptr");XYSeriesIODevice_XYSeriesIODevice_QRegisterMetaType();XYSeriesIODevice_XYSeriesIODevice_QRegisterMetaTypes();callbackXYSeriesIODevice_Constructor(this);};
	 ~XYSeriesIODevice() { callbackXYSeriesIODevice_DestroyXYSeriesIODevice(this); };
	bool open(QIODevice::OpenMode mode) { return callbackXYSeriesIODevice_Open(this, mode) != 0; };
	bool reset() { return callbackXYSeriesIODevice_Reset(this) != 0; };
	bool seek(qint64 pos) { return callbackXYSeriesIODevice_Seek(this, pos) != 0; };
	bool waitForBytesWritten(int msecs) { return callbackXYSeriesIODevice_WaitForBytesWritten(this, msecs) != 0; };
	bool waitForReadyRead(int msecs) { return callbackXYSeriesIODevice_WaitForReadyRead(this, msecs) != 0; };
	qint64 readData(char * data, qint64 maxSize) { Moc_PackedString dataPacked = { data, maxSize };return callbackXYSeriesIODevice_ReadData(this, dataPacked, maxSize); };
	qint64 readLineData(char * data, qint64 maxSize) { Moc_PackedString dataPacked = { data, maxSize };return callbackXYSeriesIODevice_ReadLineData(this, dataPacked, maxSize); };
	qint64 writeData(const char * data, qint64 maxSize) { Moc_PackedString dataPacked = { const_cast<char*>(data), maxSize };return callbackXYSeriesIODevice_WriteData(this, dataPacked, maxSize); };
	void Signal_AboutToClose() { callbackXYSeriesIODevice_AboutToClose(this); };
	void Signal_BytesWritten(qint64 bytes) { callbackXYSeriesIODevice_BytesWritten(this, bytes); };
	void Signal_ChannelBytesWritten(int channel, qint64 bytes) { callbackXYSeriesIODevice_ChannelBytesWritten(this, channel, bytes); };
	void Signal_ChannelReadyRead(int channel) { callbackXYSeriesIODevice_ChannelReadyRead(this, channel); };
	void close() { callbackXYSeriesIODevice_Close(this); };
	void Signal_ReadChannelFinished() { callbackXYSeriesIODevice_ReadChannelFinished(this); };
	void Signal_ReadyRead() { callbackXYSeriesIODevice_ReadyRead(this); };
	bool atEnd() const { return callbackXYSeriesIODevice_AtEnd(const_cast<void*>(static_cast<const void*>(this))) != 0; };
	bool canReadLine() const { return callbackXYSeriesIODevice_CanReadLine(const_cast<void*>(static_cast<const void*>(this))) != 0; };
	bool isSequential() const { return callbackXYSeriesIODevice_IsSequential(const_cast<void*>(static_cast<const void*>(this))) != 0; };
	qint64 bytesAvailable() const { return callbackXYSeriesIODevice_BytesAvailable(const_cast<void*>(static_cast<const void*>(this))); };
	qint64 bytesToWrite() const { return callbackXYSeriesIODevice_BytesToWrite(const_cast<void*>(static_cast<const void*>(this))); };
	qint64 pos() const { return callbackXYSeriesIODevice_Pos(const_cast<void*>(static_cast<const void*>(this))); };
	qint64 size() const { return callbackXYSeriesIODevice_Size(const_cast<void*>(static_cast<const void*>(this))); };
	bool event(QEvent * e) { return callbackXYSeriesIODevice_Event(this, e) != 0; };
	bool eventFilter(QObject * watched, QEvent * event) { return callbackXYSeriesIODevice_EventFilter(this, watched, event) != 0; };
	void childEvent(QChildEvent * event) { callbackXYSeriesIODevice_ChildEvent(this, event); };
	void connectNotify(const QMetaMethod & sign) { callbackXYSeriesIODevice_ConnectNotify(this, const_cast<QMetaMethod*>(&sign)); };
	void customEvent(QEvent * event) { callbackXYSeriesIODevice_CustomEvent(this, event); };
	void deleteLater() { callbackXYSeriesIODevice_DeleteLater(this); };
	void Signal_Destroyed(QObject * obj) { callbackXYSeriesIODevice_Destroyed(this, obj); };
	void disconnectNotify(const QMetaMethod & sign) { callbackXYSeriesIODevice_DisconnectNotify(this, const_cast<QMetaMethod*>(&sign)); };
	void Signal_ObjectNameChanged(const QString & objectName) { QByteArray taa2c4f = objectName.toUtf8(); Moc_PackedString objectNamePacked = { const_cast<char*>(taa2c4f.prepend("WHITESPACE").constData()+10), taa2c4f.size()-10 };callbackXYSeriesIODevice_ObjectNameChanged(this, objectNamePacked); };
	void timerEvent(QTimerEvent * event) { callbackXYSeriesIODevice_TimerEvent(this, event); };
	
signals:
public slots:
private:
};

Q_DECLARE_METATYPE(XYSeriesIODevice*)


void XYSeriesIODevice_XYSeriesIODevice_QRegisterMetaTypes() {
}

int Widget_Widget_QRegisterMetaType()
{
	return qRegisterMetaType<Widget*>();
}

int Widget_Widget_QRegisterMetaType2(char* typeName)
{
	return qRegisterMetaType<Widget*>(const_cast<const char*>(typeName));
}

int Widget_Widget_QmlRegisterType()
{
#ifdef QT_QML_LIB
	return qmlRegisterType<Widget>();
#else
	return 0;
#endif
}

int Widget_Widget_QmlRegisterType2(char* uri, int versionMajor, int versionMinor, char* qmlName)
{
#ifdef QT_QML_LIB
	return qmlRegisterType<Widget>(const_cast<const char*>(uri), versionMajor, versionMinor, const_cast<const char*>(qmlName));
#else
	return 0;
#endif
}

void* Widget___addActions_actions_atList(void* ptr, int i)
{
	return const_cast<QAction*>(static_cast<QList<QAction *>*>(ptr)->at(i));
}

void Widget___addActions_actions_setList(void* ptr, void* i)
{
	static_cast<QList<QAction *>*>(ptr)->append(static_cast<QAction*>(i));
}

void* Widget___addActions_actions_newList(void* ptr)
{
	Q_UNUSED(ptr);
	return new QList<QAction *>;
}

void* Widget___insertActions_actions_atList(void* ptr, int i)
{
	return const_cast<QAction*>(static_cast<QList<QAction *>*>(ptr)->at(i));
}

void Widget___insertActions_actions_setList(void* ptr, void* i)
{
	static_cast<QList<QAction *>*>(ptr)->append(static_cast<QAction*>(i));
}

void* Widget___insertActions_actions_newList(void* ptr)
{
	Q_UNUSED(ptr);
	return new QList<QAction *>;
}

void* Widget___actions_atList(void* ptr, int i)
{
	return const_cast<QAction*>(static_cast<QList<QAction *>*>(ptr)->at(i));
}

void Widget___actions_setList(void* ptr, void* i)
{
	static_cast<QList<QAction *>*>(ptr)->append(static_cast<QAction*>(i));
}

void* Widget___actions_newList(void* ptr)
{
	Q_UNUSED(ptr);
	return new QList<QAction *>;
}

void* Widget___dynamicPropertyNames_atList(void* ptr, int i)
{
	return new QByteArray(static_cast<QList<QByteArray>*>(ptr)->at(i));
}

void Widget___dynamicPropertyNames_setList(void* ptr, void* i)
{
	static_cast<QList<QByteArray>*>(ptr)->append(*static_cast<QByteArray*>(i));
}

void* Widget___dynamicPropertyNames_newList(void* ptr)
{
	Q_UNUSED(ptr);
	return new QList<QByteArray>;
}

void* Widget___findChildren_atList2(void* ptr, int i)
{
	return const_cast<QObject*>(static_cast<QList<QObject*>*>(ptr)->at(i));
}

void Widget___findChildren_setList2(void* ptr, void* i)
{
	static_cast<QList<QObject*>*>(ptr)->append(static_cast<QObject*>(i));
}

void* Widget___findChildren_newList2(void* ptr)
{
	Q_UNUSED(ptr);
	return new QList<QObject*>;
}

void* Widget___findChildren_atList3(void* ptr, int i)
{
	return const_cast<QObject*>(static_cast<QList<QObject*>*>(ptr)->at(i));
}

void Widget___findChildren_setList3(void* ptr, void* i)
{
	static_cast<QList<QObject*>*>(ptr)->append(static_cast<QObject*>(i));
}

void* Widget___findChildren_newList3(void* ptr)
{
	Q_UNUSED(ptr);
	return new QList<QObject*>;
}

void* Widget___findChildren_atList(void* ptr, int i)
{
	return const_cast<QObject*>(static_cast<QList<QObject*>*>(ptr)->at(i));
}

void Widget___findChildren_setList(void* ptr, void* i)
{
	static_cast<QList<QObject*>*>(ptr)->append(static_cast<QObject*>(i));
}

void* Widget___findChildren_newList(void* ptr)
{
	Q_UNUSED(ptr);
	return new QList<QObject*>;
}

void* Widget___children_atList(void* ptr, int i)
{
	return const_cast<QObject*>(static_cast<QList<QObject *>*>(ptr)->at(i));
}

void Widget___children_setList(void* ptr, void* i)
{
	static_cast<QList<QObject *>*>(ptr)->append(static_cast<QObject*>(i));
}

void* Widget___children_newList(void* ptr)
{
	Q_UNUSED(ptr);
	return new QList<QObject *>;
}

void* Widget_NewWidget(void* parent, long long fo)
{
		return new Widget(static_cast<QWidget*>(parent), static_cast<Qt::WindowType>(fo));
}

void Widget_DestroyWidget(void* ptr)
{
	static_cast<Widget*>(ptr)->~Widget();
}

char Widget_CloseDefault(void* ptr)
{
	return static_cast<Widget*>(ptr)->QWidget::close();
}

char Widget_EventDefault(void* ptr, void* event)
{
	return static_cast<Widget*>(ptr)->QWidget::event(static_cast<QEvent*>(event));
}

char Widget_FocusNextPrevChildDefault(void* ptr, char next)
{
	return static_cast<Widget*>(ptr)->QWidget::focusNextPrevChild(next != 0);
}

char Widget_NativeEventDefault(void* ptr, void* eventType, void* message, long result)
{
	return static_cast<Widget*>(ptr)->QWidget::nativeEvent(*static_cast<QByteArray*>(eventType), message, &result);
}

void Widget_ActionEventDefault(void* ptr, void* event)
{
	static_cast<Widget*>(ptr)->QWidget::actionEvent(static_cast<QActionEvent*>(event));
}

void Widget_ChangeEventDefault(void* ptr, void* event)
{
	static_cast<Widget*>(ptr)->QWidget::changeEvent(static_cast<QEvent*>(event));
}

void Widget_CloseEventDefault(void* ptr, void* event)
{
	static_cast<Widget*>(ptr)->QWidget::closeEvent(static_cast<QCloseEvent*>(event));
}

void Widget_ContextMenuEventDefault(void* ptr, void* event)
{
	static_cast<Widget*>(ptr)->QWidget::contextMenuEvent(static_cast<QContextMenuEvent*>(event));
}

void Widget_DragEnterEventDefault(void* ptr, void* event)
{
	static_cast<Widget*>(ptr)->QWidget::dragEnterEvent(static_cast<QDragEnterEvent*>(event));
}

void Widget_DragLeaveEventDefault(void* ptr, void* event)
{
	static_cast<Widget*>(ptr)->QWidget::dragLeaveEvent(static_cast<QDragLeaveEvent*>(event));
}

void Widget_DragMoveEventDefault(void* ptr, void* event)
{
	static_cast<Widget*>(ptr)->QWidget::dragMoveEvent(static_cast<QDragMoveEvent*>(event));
}

void Widget_DropEventDefault(void* ptr, void* event)
{
	static_cast<Widget*>(ptr)->QWidget::dropEvent(static_cast<QDropEvent*>(event));
}

void Widget_EnterEventDefault(void* ptr, void* event)
{
	static_cast<Widget*>(ptr)->QWidget::enterEvent(static_cast<QEvent*>(event));
}

void Widget_FocusInEventDefault(void* ptr, void* event)
{
	static_cast<Widget*>(ptr)->QWidget::focusInEvent(static_cast<QFocusEvent*>(event));
}

void Widget_FocusOutEventDefault(void* ptr, void* event)
{
	static_cast<Widget*>(ptr)->QWidget::focusOutEvent(static_cast<QFocusEvent*>(event));
}

void Widget_HideDefault(void* ptr)
{
	static_cast<Widget*>(ptr)->QWidget::hide();
}

void Widget_HideEventDefault(void* ptr, void* event)
{
	static_cast<Widget*>(ptr)->QWidget::hideEvent(static_cast<QHideEvent*>(event));
}

void Widget_InputMethodEventDefault(void* ptr, void* event)
{
	static_cast<Widget*>(ptr)->QWidget::inputMethodEvent(static_cast<QInputMethodEvent*>(event));
}

void Widget_KeyPressEventDefault(void* ptr, void* event)
{
	static_cast<Widget*>(ptr)->QWidget::keyPressEvent(static_cast<QKeyEvent*>(event));
}

void Widget_KeyReleaseEventDefault(void* ptr, void* event)
{
	static_cast<Widget*>(ptr)->QWidget::keyReleaseEvent(static_cast<QKeyEvent*>(event));
}

void Widget_LeaveEventDefault(void* ptr, void* event)
{
	static_cast<Widget*>(ptr)->QWidget::leaveEvent(static_cast<QEvent*>(event));
}

void Widget_LowerDefault(void* ptr)
{
	static_cast<Widget*>(ptr)->QWidget::lower();
}

void Widget_MouseDoubleClickEventDefault(void* ptr, void* event)
{
	static_cast<Widget*>(ptr)->QWidget::mouseDoubleClickEvent(static_cast<QMouseEvent*>(event));
}

void Widget_MouseMoveEventDefault(void* ptr, void* event)
{
	static_cast<Widget*>(ptr)->QWidget::mouseMoveEvent(static_cast<QMouseEvent*>(event));
}

void Widget_MousePressEventDefault(void* ptr, void* event)
{
	static_cast<Widget*>(ptr)->QWidget::mousePressEvent(static_cast<QMouseEvent*>(event));
}

void Widget_MouseReleaseEventDefault(void* ptr, void* event)
{
	static_cast<Widget*>(ptr)->QWidget::mouseReleaseEvent(static_cast<QMouseEvent*>(event));
}

void Widget_MoveEventDefault(void* ptr, void* event)
{
	static_cast<Widget*>(ptr)->QWidget::moveEvent(static_cast<QMoveEvent*>(event));
}

void Widget_PaintEventDefault(void* ptr, void* event)
{
	static_cast<Widget*>(ptr)->QWidget::paintEvent(static_cast<QPaintEvent*>(event));
}

void Widget_RaiseDefault(void* ptr)
{
	static_cast<Widget*>(ptr)->QWidget::raise();
}

void Widget_RepaintDefault(void* ptr)
{
	static_cast<Widget*>(ptr)->QWidget::repaint();
}

void Widget_ResizeEventDefault(void* ptr, void* event)
{
	static_cast<Widget*>(ptr)->QWidget::resizeEvent(static_cast<QResizeEvent*>(event));
}

void Widget_SetDisabledDefault(void* ptr, char disable)
{
	static_cast<Widget*>(ptr)->QWidget::setDisabled(disable != 0);
}

void Widget_SetEnabledDefault(void* ptr, char vbo)
{
	static_cast<Widget*>(ptr)->QWidget::setEnabled(vbo != 0);
}

void Widget_SetFocus2Default(void* ptr)
{
	static_cast<Widget*>(ptr)->QWidget::setFocus();
}

void Widget_SetHiddenDefault(void* ptr, char hidden)
{
	static_cast<Widget*>(ptr)->QWidget::setHidden(hidden != 0);
}

void Widget_SetStyleSheetDefault(void* ptr, struct Moc_PackedString styleSheet)
{
	static_cast<Widget*>(ptr)->QWidget::setStyleSheet(QString::fromUtf8(styleSheet.data, styleSheet.len));
}

void Widget_SetVisibleDefault(void* ptr, char visible)
{
	static_cast<Widget*>(ptr)->QWidget::setVisible(visible != 0);
}

void Widget_SetWindowModifiedDefault(void* ptr, char vbo)
{
	static_cast<Widget*>(ptr)->QWidget::setWindowModified(vbo != 0);
}

void Widget_SetWindowTitleDefault(void* ptr, struct Moc_PackedString vqs)
{
	static_cast<Widget*>(ptr)->QWidget::setWindowTitle(QString::fromUtf8(vqs.data, vqs.len));
}

void Widget_ShowDefault(void* ptr)
{
	static_cast<Widget*>(ptr)->QWidget::show();
}

void Widget_ShowEventDefault(void* ptr, void* event)
{
	static_cast<Widget*>(ptr)->QWidget::showEvent(static_cast<QShowEvent*>(event));
}

void Widget_ShowFullScreenDefault(void* ptr)
{
	static_cast<Widget*>(ptr)->QWidget::showFullScreen();
}

void Widget_ShowMaximizedDefault(void* ptr)
{
	static_cast<Widget*>(ptr)->QWidget::showMaximized();
}

void Widget_ShowMinimizedDefault(void* ptr)
{
	static_cast<Widget*>(ptr)->QWidget::showMinimized();
}

void Widget_ShowNormalDefault(void* ptr)
{
	static_cast<Widget*>(ptr)->QWidget::showNormal();
}

void Widget_TabletEventDefault(void* ptr, void* event)
{
	static_cast<Widget*>(ptr)->QWidget::tabletEvent(static_cast<QTabletEvent*>(event));
}

void Widget_UpdateDefault(void* ptr)
{
	static_cast<Widget*>(ptr)->QWidget::update();
}

void Widget_UpdateMicroFocusDefault(void* ptr)
{
	static_cast<Widget*>(ptr)->QWidget::updateMicroFocus();
}

void Widget_WheelEventDefault(void* ptr, void* event)
{
	static_cast<Widget*>(ptr)->QWidget::wheelEvent(static_cast<QWheelEvent*>(event));
}

void* Widget_PaintEngineDefault(void* ptr)
{
	return static_cast<Widget*>(ptr)->QWidget::paintEngine();
}

void* Widget_MinimumSizeHintDefault(void* ptr)
{
	return ({ QSize tmpValue = static_cast<Widget*>(ptr)->QWidget::minimumSizeHint(); new QSize(tmpValue.width(), tmpValue.height()); });
}

void* Widget_SizeHintDefault(void* ptr)
{
	return ({ QSize tmpValue = static_cast<Widget*>(ptr)->QWidget::sizeHint(); new QSize(tmpValue.width(), tmpValue.height()); });
}

void* Widget_InputMethodQueryDefault(void* ptr, long long query)
{
	return new QVariant(static_cast<Widget*>(ptr)->QWidget::inputMethodQuery(static_cast<Qt::InputMethodQuery>(query)));
}

char Widget_HasHeightForWidthDefault(void* ptr)
{
	return static_cast<Widget*>(ptr)->QWidget::hasHeightForWidth();
}

int Widget_HeightForWidthDefault(void* ptr, int w)
{
	return static_cast<Widget*>(ptr)->QWidget::heightForWidth(w);
}

int Widget_MetricDefault(void* ptr, long long m)
{
	return static_cast<Widget*>(ptr)->QWidget::metric(static_cast<QPaintDevice::PaintDeviceMetric>(m));
}

char Widget_EventFilterDefault(void* ptr, void* watched, void* event)
{
	return static_cast<Widget*>(ptr)->QWidget::eventFilter(static_cast<QObject*>(watched), static_cast<QEvent*>(event));
}

void Widget_ChildEventDefault(void* ptr, void* event)
{
	static_cast<Widget*>(ptr)->QWidget::childEvent(static_cast<QChildEvent*>(event));
}

void Widget_ConnectNotifyDefault(void* ptr, void* sign)
{
	static_cast<Widget*>(ptr)->QWidget::connectNotify(*static_cast<QMetaMethod*>(sign));
}

void Widget_CustomEventDefault(void* ptr, void* event)
{
	static_cast<Widget*>(ptr)->QWidget::customEvent(static_cast<QEvent*>(event));
}

void Widget_DeleteLaterDefault(void* ptr)
{
	static_cast<Widget*>(ptr)->QWidget::deleteLater();
}

void Widget_DisconnectNotifyDefault(void* ptr, void* sign)
{
	static_cast<Widget*>(ptr)->QWidget::disconnectNotify(*static_cast<QMetaMethod*>(sign));
}

void Widget_TimerEventDefault(void* ptr, void* event)
{
	static_cast<Widget*>(ptr)->QWidget::timerEvent(static_cast<QTimerEvent*>(event));
}



int XYSeriesIODevice_XYSeriesIODevice_QRegisterMetaType()
{
	return qRegisterMetaType<XYSeriesIODevice*>();
}

int XYSeriesIODevice_XYSeriesIODevice_QRegisterMetaType2(char* typeName)
{
	return qRegisterMetaType<XYSeriesIODevice*>(const_cast<const char*>(typeName));
}

int XYSeriesIODevice_XYSeriesIODevice_QmlRegisterType()
{
#ifdef QT_QML_LIB
	return qmlRegisterType<XYSeriesIODevice>();
#else
	return 0;
#endif
}

int XYSeriesIODevice_XYSeriesIODevice_QmlRegisterType2(char* uri, int versionMajor, int versionMinor, char* qmlName)
{
#ifdef QT_QML_LIB
	return qmlRegisterType<XYSeriesIODevice>(const_cast<const char*>(uri), versionMajor, versionMinor, const_cast<const char*>(qmlName));
#else
	return 0;
#endif
}

void* XYSeriesIODevice___dynamicPropertyNames_atList(void* ptr, int i)
{
	return new QByteArray(static_cast<QList<QByteArray>*>(ptr)->at(i));
}

void XYSeriesIODevice___dynamicPropertyNames_setList(void* ptr, void* i)
{
	static_cast<QList<QByteArray>*>(ptr)->append(*static_cast<QByteArray*>(i));
}

void* XYSeriesIODevice___dynamicPropertyNames_newList(void* ptr)
{
	Q_UNUSED(ptr);
	return new QList<QByteArray>;
}

void* XYSeriesIODevice___findChildren_atList2(void* ptr, int i)
{
	return const_cast<QObject*>(static_cast<QList<QObject*>*>(ptr)->at(i));
}

void XYSeriesIODevice___findChildren_setList2(void* ptr, void* i)
{
	static_cast<QList<QObject*>*>(ptr)->append(static_cast<QObject*>(i));
}

void* XYSeriesIODevice___findChildren_newList2(void* ptr)
{
	Q_UNUSED(ptr);
	return new QList<QObject*>;
}

void* XYSeriesIODevice___findChildren_atList3(void* ptr, int i)
{
	return const_cast<QObject*>(static_cast<QList<QObject*>*>(ptr)->at(i));
}

void XYSeriesIODevice___findChildren_setList3(void* ptr, void* i)
{
	static_cast<QList<QObject*>*>(ptr)->append(static_cast<QObject*>(i));
}

void* XYSeriesIODevice___findChildren_newList3(void* ptr)
{
	Q_UNUSED(ptr);
	return new QList<QObject*>;
}

void* XYSeriesIODevice___findChildren_atList(void* ptr, int i)
{
	return const_cast<QObject*>(static_cast<QList<QObject*>*>(ptr)->at(i));
}

void XYSeriesIODevice___findChildren_setList(void* ptr, void* i)
{
	static_cast<QList<QObject*>*>(ptr)->append(static_cast<QObject*>(i));
}

void* XYSeriesIODevice___findChildren_newList(void* ptr)
{
	Q_UNUSED(ptr);
	return new QList<QObject*>;
}

void* XYSeriesIODevice___children_atList(void* ptr, int i)
{
	return const_cast<QObject*>(static_cast<QList<QObject *>*>(ptr)->at(i));
}

void XYSeriesIODevice___children_setList(void* ptr, void* i)
{
	static_cast<QList<QObject *>*>(ptr)->append(static_cast<QObject*>(i));
}

void* XYSeriesIODevice___children_newList(void* ptr)
{
	Q_UNUSED(ptr);
	return new QList<QObject *>;
}

void* XYSeriesIODevice_NewXYSeriesIODevice2(void* parent)
{
	if (dynamic_cast<QCameraImageCapture*>(static_cast<QObject*>(parent))) {
		return new XYSeriesIODevice(static_cast<QCameraImageCapture*>(parent));
	} else if (dynamic_cast<QDBusPendingCallWatcher*>(static_cast<QObject*>(parent))) {
		return new XYSeriesIODevice(static_cast<QDBusPendingCallWatcher*>(parent));
	} else if (dynamic_cast<QExtensionFactory*>(static_cast<QObject*>(parent))) {
		return new XYSeriesIODevice(static_cast<QExtensionFactory*>(parent));
	} else if (dynamic_cast<QExtensionManager*>(static_cast<QObject*>(parent))) {
		return new XYSeriesIODevice(static_cast<QExtensionManager*>(parent));
	} else if (dynamic_cast<QGraphicsObject*>(static_cast<QObject*>(parent))) {
		return new XYSeriesIODevice(static_cast<QGraphicsObject*>(parent));
	} else if (dynamic_cast<QGraphicsWidget*>(static_cast<QObject*>(parent))) {
		return new XYSeriesIODevice(static_cast<QGraphicsWidget*>(parent));
	} else if (dynamic_cast<QLayout*>(static_cast<QObject*>(parent))) {
		return new XYSeriesIODevice(static_cast<QLayout*>(parent));
	} else if (dynamic_cast<QMediaPlaylist*>(static_cast<QObject*>(parent))) {
		return new XYSeriesIODevice(static_cast<QMediaPlaylist*>(parent));
	} else if (dynamic_cast<QMediaRecorder*>(static_cast<QObject*>(parent))) {
		return new XYSeriesIODevice(static_cast<QMediaRecorder*>(parent));
	} else if (dynamic_cast<QOffscreenSurface*>(static_cast<QObject*>(parent))) {
		return new XYSeriesIODevice(static_cast<QOffscreenSurface*>(parent));
	} else if (dynamic_cast<QPaintDeviceWindow*>(static_cast<QObject*>(parent))) {
		return new XYSeriesIODevice(static_cast<QPaintDeviceWindow*>(parent));
	} else if (dynamic_cast<QPdfWriter*>(static_cast<QObject*>(parent))) {
		return new XYSeriesIODevice(static_cast<QPdfWriter*>(parent));
	} else if (dynamic_cast<QQuickItem*>(static_cast<QObject*>(parent))) {
		return new XYSeriesIODevice(static_cast<QQuickItem*>(parent));
	} else if (dynamic_cast<QRadioData*>(static_cast<QObject*>(parent))) {
		return new XYSeriesIODevice(static_cast<QRadioData*>(parent));
	} else if (dynamic_cast<QSignalSpy*>(static_cast<QObject*>(parent))) {
		return new XYSeriesIODevice(static_cast<QSignalSpy*>(parent));
	} else if (dynamic_cast<QWidget*>(static_cast<QObject*>(parent))) {
		return new XYSeriesIODevice(static_cast<QWidget*>(parent));
	} else if (dynamic_cast<QWindow*>(static_cast<QObject*>(parent))) {
		return new XYSeriesIODevice(static_cast<QWindow*>(parent));
	} else {
		return new XYSeriesIODevice(static_cast<QObject*>(parent));
	}
}

void* XYSeriesIODevice_NewXYSeriesIODevice()
{
	return new XYSeriesIODevice();
}

void XYSeriesIODevice_DestroyXYSeriesIODevice(void* ptr)
{
	static_cast<XYSeriesIODevice*>(ptr)->~XYSeriesIODevice();
}

void XYSeriesIODevice_DestroyXYSeriesIODeviceDefault(void* ptr)
{
	Q_UNUSED(ptr);

}

char XYSeriesIODevice_OpenDefault(void* ptr, long long mode)
{
	return static_cast<XYSeriesIODevice*>(ptr)->QIODevice::open(static_cast<QIODevice::OpenModeFlag>(mode));
}

char XYSeriesIODevice_ResetDefault(void* ptr)
{
	return static_cast<XYSeriesIODevice*>(ptr)->QIODevice::reset();
}

char XYSeriesIODevice_SeekDefault(void* ptr, long long pos)
{
	return static_cast<XYSeriesIODevice*>(ptr)->QIODevice::seek(pos);
}

char XYSeriesIODevice_WaitForBytesWrittenDefault(void* ptr, int msecs)
{
	return static_cast<XYSeriesIODevice*>(ptr)->QIODevice::waitForBytesWritten(msecs);
}

char XYSeriesIODevice_WaitForReadyReadDefault(void* ptr, int msecs)
{
	return static_cast<XYSeriesIODevice*>(ptr)->QIODevice::waitForReadyRead(msecs);
}

long long XYSeriesIODevice_ReadData(void* ptr, char* data, long long maxSize)
{
	Q_UNUSED(ptr);
	Q_UNUSED(data);
	Q_UNUSED(maxSize);

}

long long XYSeriesIODevice_ReadDataDefault(void* ptr, char* data, long long maxSize)
{
	Q_UNUSED(ptr);
	Q_UNUSED(data);
	Q_UNUSED(maxSize);

}

long long XYSeriesIODevice_ReadLineDataDefault(void* ptr, char* data, long long maxSize)
{
	return static_cast<XYSeriesIODevice*>(ptr)->QIODevice::readLineData(data, maxSize);
}

long long XYSeriesIODevice_WriteData(void* ptr, char* data, long long maxSize)
{
	Q_UNUSED(ptr);
	Q_UNUSED(data);
	Q_UNUSED(maxSize);

}

long long XYSeriesIODevice_WriteDataDefault(void* ptr, char* data, long long maxSize)
{
	Q_UNUSED(ptr);
	Q_UNUSED(data);
	Q_UNUSED(maxSize);

}

void XYSeriesIODevice_CloseDefault(void* ptr)
{
	static_cast<XYSeriesIODevice*>(ptr)->QIODevice::close();
}

char XYSeriesIODevice_AtEndDefault(void* ptr)
{
	return static_cast<XYSeriesIODevice*>(ptr)->QIODevice::atEnd();
}

char XYSeriesIODevice_CanReadLineDefault(void* ptr)
{
	return static_cast<XYSeriesIODevice*>(ptr)->QIODevice::canReadLine();
}

char XYSeriesIODevice_IsSequentialDefault(void* ptr)
{
	return static_cast<XYSeriesIODevice*>(ptr)->QIODevice::isSequential();
}

long long XYSeriesIODevice_BytesAvailableDefault(void* ptr)
{
	return static_cast<XYSeriesIODevice*>(ptr)->QIODevice::bytesAvailable();
}

long long XYSeriesIODevice_BytesToWriteDefault(void* ptr)
{
	return static_cast<XYSeriesIODevice*>(ptr)->QIODevice::bytesToWrite();
}

long long XYSeriesIODevice_PosDefault(void* ptr)
{
	return static_cast<XYSeriesIODevice*>(ptr)->QIODevice::pos();
}

long long XYSeriesIODevice_SizeDefault(void* ptr)
{
	return static_cast<XYSeriesIODevice*>(ptr)->QIODevice::size();
}

char XYSeriesIODevice_EventDefault(void* ptr, void* e)
{
	return static_cast<XYSeriesIODevice*>(ptr)->QIODevice::event(static_cast<QEvent*>(e));
}

char XYSeriesIODevice_EventFilterDefault(void* ptr, void* watched, void* event)
{
	return static_cast<XYSeriesIODevice*>(ptr)->QIODevice::eventFilter(static_cast<QObject*>(watched), static_cast<QEvent*>(event));
}

void XYSeriesIODevice_ChildEventDefault(void* ptr, void* event)
{
	static_cast<XYSeriesIODevice*>(ptr)->QIODevice::childEvent(static_cast<QChildEvent*>(event));
}

void XYSeriesIODevice_ConnectNotifyDefault(void* ptr, void* sign)
{
	static_cast<XYSeriesIODevice*>(ptr)->QIODevice::connectNotify(*static_cast<QMetaMethod*>(sign));
}

void XYSeriesIODevice_CustomEventDefault(void* ptr, void* event)
{
	static_cast<XYSeriesIODevice*>(ptr)->QIODevice::customEvent(static_cast<QEvent*>(event));
}

void XYSeriesIODevice_DeleteLaterDefault(void* ptr)
{
	static_cast<XYSeriesIODevice*>(ptr)->QIODevice::deleteLater();
}

void XYSeriesIODevice_DisconnectNotifyDefault(void* ptr, void* sign)
{
	static_cast<XYSeriesIODevice*>(ptr)->QIODevice::disconnectNotify(*static_cast<QMetaMethod*>(sign));
}

void XYSeriesIODevice_TimerEventDefault(void* ptr, void* event)
{
	static_cast<XYSeriesIODevice*>(ptr)->QIODevice::timerEvent(static_cast<QTimerEvent*>(event));
}



#include "moc_moc.h"
