

#pragma once

#ifndef GO_MOC_H
#define GO_MOC_H

#include <stdint.h>

#ifdef __cplusplus
class MocLabel;
void MocLabel_MocLabel_QRegisterMetaTypes();
extern "C" {
#endif

struct Moc_PackedString { char* data; long long len; };
struct Moc_PackedList { void* data; long long len; };
void MocLabel_ConnectUpdateLabel(void* ptr);
void MocLabel_DisconnectUpdateLabel(void* ptr);
void MocLabel_UpdateLabel(void* ptr, int v0);
int MocLabel_MocLabel_QRegisterMetaType();
int MocLabel_MocLabel_QRegisterMetaType2(char* typeName);
int MocLabel_MocLabel_QmlRegisterType();
int MocLabel_MocLabel_QmlRegisterType2(char* uri, int versionMajor, int versionMinor, char* qmlName);
void* MocLabel___addActions_actions_atList(void* ptr, int i);
void MocLabel___addActions_actions_setList(void* ptr, void* i);
void* MocLabel___addActions_actions_newList(void* ptr);
void* MocLabel___insertActions_actions_atList(void* ptr, int i);
void MocLabel___insertActions_actions_setList(void* ptr, void* i);
void* MocLabel___insertActions_actions_newList(void* ptr);
void* MocLabel___actions_atList(void* ptr, int i);
void MocLabel___actions_setList(void* ptr, void* i);
void* MocLabel___actions_newList(void* ptr);
void* MocLabel___dynamicPropertyNames_atList(void* ptr, int i);
void MocLabel___dynamicPropertyNames_setList(void* ptr, void* i);
void* MocLabel___dynamicPropertyNames_newList(void* ptr);
void* MocLabel___findChildren_atList2(void* ptr, int i);
void MocLabel___findChildren_setList2(void* ptr, void* i);
void* MocLabel___findChildren_newList2(void* ptr);
void* MocLabel___findChildren_atList3(void* ptr, int i);
void MocLabel___findChildren_setList3(void* ptr, void* i);
void* MocLabel___findChildren_newList3(void* ptr);
void* MocLabel___findChildren_atList(void* ptr, int i);
void MocLabel___findChildren_setList(void* ptr, void* i);
void* MocLabel___findChildren_newList(void* ptr);
void* MocLabel___children_atList(void* ptr, int i);
void MocLabel___children_setList(void* ptr, void* i);
void* MocLabel___children_newList(void* ptr);
void* MocLabel_NewMocLabel(void* parent, long long fo);
void* MocLabel_NewMocLabel2(struct Moc_PackedString text, void* parent, long long fo);
void MocLabel_DestroyMocLabel(void* ptr);
char MocLabel_EventDefault(void* ptr, void* e);
char MocLabel_FocusNextPrevChildDefault(void* ptr, char next);
void MocLabel_ChangeEventDefault(void* ptr, void* ev);
void MocLabel_ClearDefault(void* ptr);
void MocLabel_ContextMenuEventDefault(void* ptr, void* ev);
void MocLabel_FocusInEventDefault(void* ptr, void* ev);
void MocLabel_FocusOutEventDefault(void* ptr, void* ev);
void MocLabel_KeyPressEventDefault(void* ptr, void* ev);
void MocLabel_MouseMoveEventDefault(void* ptr, void* ev);
void MocLabel_MousePressEventDefault(void* ptr, void* ev);
void MocLabel_MouseReleaseEventDefault(void* ptr, void* ev);
void MocLabel_PaintEventDefault(void* ptr, void* vqp);
void MocLabel_SetMovieDefault(void* ptr, void* movie);
void MocLabel_SetNum2Default(void* ptr, double num);
void MocLabel_SetNumDefault(void* ptr, int num);
void MocLabel_SetPictureDefault(void* ptr, void* picture);
void MocLabel_SetPixmapDefault(void* ptr, void* vqp);
void MocLabel_SetTextDefault(void* ptr, struct Moc_PackedString vqs);
void* MocLabel_MinimumSizeHintDefault(void* ptr);
void* MocLabel_SizeHintDefault(void* ptr);
int MocLabel_HeightForWidthDefault(void* ptr, int w);
char MocLabel_CloseDefault(void* ptr);
char MocLabel_NativeEventDefault(void* ptr, void* eventType, void* message, long result);
void MocLabel_ActionEventDefault(void* ptr, void* event);
void MocLabel_CloseEventDefault(void* ptr, void* event);
void MocLabel_DragEnterEventDefault(void* ptr, void* event);
void MocLabel_DragLeaveEventDefault(void* ptr, void* event);
void MocLabel_DragMoveEventDefault(void* ptr, void* event);
void MocLabel_DropEventDefault(void* ptr, void* event);
void MocLabel_EnterEventDefault(void* ptr, void* event);
void MocLabel_HideDefault(void* ptr);
void MocLabel_HideEventDefault(void* ptr, void* event);
void MocLabel_InputMethodEventDefault(void* ptr, void* event);
void MocLabel_KeyReleaseEventDefault(void* ptr, void* event);
void MocLabel_LeaveEventDefault(void* ptr, void* event);
void MocLabel_LowerDefault(void* ptr);
void MocLabel_MouseDoubleClickEventDefault(void* ptr, void* event);
void MocLabel_MoveEventDefault(void* ptr, void* event);
void MocLabel_RaiseDefault(void* ptr);
void MocLabel_RepaintDefault(void* ptr);
void MocLabel_ResizeEventDefault(void* ptr, void* event);
void MocLabel_SetDisabledDefault(void* ptr, char disable);
void MocLabel_SetEnabledDefault(void* ptr, char vbo);
void MocLabel_SetFocus2Default(void* ptr);
void MocLabel_SetHiddenDefault(void* ptr, char hidden);
void MocLabel_SetStyleSheetDefault(void* ptr, struct Moc_PackedString styleSheet);
void MocLabel_SetVisibleDefault(void* ptr, char visible);
void MocLabel_SetWindowModifiedDefault(void* ptr, char vbo);
void MocLabel_SetWindowTitleDefault(void* ptr, struct Moc_PackedString vqs);
void MocLabel_ShowDefault(void* ptr);
void MocLabel_ShowEventDefault(void* ptr, void* event);
void MocLabel_ShowFullScreenDefault(void* ptr);
void MocLabel_ShowMaximizedDefault(void* ptr);
void MocLabel_ShowMinimizedDefault(void* ptr);
void MocLabel_ShowNormalDefault(void* ptr);
void MocLabel_TabletEventDefault(void* ptr, void* event);
void MocLabel_UpdateDefault(void* ptr);
void MocLabel_UpdateMicroFocusDefault(void* ptr);
void MocLabel_WheelEventDefault(void* ptr, void* event);
void* MocLabel_PaintEngineDefault(void* ptr);
void* MocLabel_InputMethodQueryDefault(void* ptr, long long query);
char MocLabel_HasHeightForWidthDefault(void* ptr);
int MocLabel_MetricDefault(void* ptr, long long m);
char MocLabel_EventFilterDefault(void* ptr, void* watched, void* event);
void MocLabel_ChildEventDefault(void* ptr, void* event);
void MocLabel_ConnectNotifyDefault(void* ptr, void* sign);
void MocLabel_CustomEventDefault(void* ptr, void* event);
void MocLabel_DeleteLaterDefault(void* ptr);
void MocLabel_DisconnectNotifyDefault(void* ptr, void* sign);
void MocLabel_TimerEventDefault(void* ptr, void* event);
;

#ifdef __cplusplus
}
#endif

#endif