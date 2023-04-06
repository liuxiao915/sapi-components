import * as mars3d from 'mars3d'



//相机的⾼度的最⼩值
viewer.scene.screenSpaceCameraController.minimumZoomDistance = 250000;
//相机⾼度的最⼤值
viewer.scene.screenSpaceCameraController.maximumZoomDistance = 22000000;  
//设置相机缩⼩时的速率
viewer.scene.screenSpaceCameraController._minimumZoomRate = 30000; 
//设置相机放⼤时的
viewer.scene.screenSpaceCameraController._maximumZoomRate=5906376272000  


// 如果为true，则允许⽤户旋转相机。如果为假，相机将锁定到当前标题。此标志仅适⽤于2D和3D。
scene.screenSpaceCameraController.enableRotate = false;
// 如果为true，则允许⽤户平移地图。如果为假，相机将保持锁定在当前位置。此标志仅适⽤于2D和Columbus视图模式。
scene.screenSpaceCameraController.enableTranslate = false;
// 如果为true，允许⽤户放⼤和缩⼩。如果为假，相机将锁定到距离椭圆体的当前距离
scene.screenSpaceCameraController.enableZoom = false;
// 如果为true，则允许⽤户倾斜相机。如果为假，相机将锁定到当前标题。这个标志只适⽤于3D和哥伦布视图。
scene.screenSpaceCameraController.enableTilt = false;
