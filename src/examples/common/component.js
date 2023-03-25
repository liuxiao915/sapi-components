export function getComponentList (moduleList){
  const requireAll = requireContext => requireContext.keys().map(requireContext)
  let targetModuleList = requireAll(moduleList)
  const componentList = targetModuleList.map(module => {
    return module.default
  })
  return componentList
}
