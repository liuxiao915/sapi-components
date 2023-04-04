import { computed } from 'vue';

export function useCommonClassName(){
    const componentName = usePrefixClass()
  return {
        SIZE: computed(() => ({
            small: `${componentName}-size-s`,
            medium: `${componentName}-size-m`,
            large: `${componentName}-size-l`,
            default: '',
            xs: `${componentName}-size-xs`,
            xl: `${componentName}-size-xl`,
            block: `${componentName}-size-full-width`,
        })),
        STATUS: computed(() => ({
            loading: `${componentName}-is-loading`,
            loadMore: `${componentName}-is-load-more`,
            disabled: `${componentName}-is-disabled`,
            focused: `${componentName}-is-focused`,
            success: `${componentName}-is-success`,
            error: `${componentName}-is-error`,
            warning: `${componentName}-is-warning`,
            selected: `${componentName}-is-selected`,
            active: `${componentName}-is-active`,
            checked: `${componentName}-is-checked`,
            current: `${componentName}-is-current`,
            hidden: `${componentName}-is-hidden`,
            plain: `${componentName}-is-plain`,
            visible: `${componentName}-is-visible`,
            expanded: `${componentName}-is-expanded`,
            indeterminate: `${componentName}-is-indeterminate`,
        })),
    };
}

export function usePrefixClass(str){
    if(!str) return 'sapi'
    return computed(()=>{
        let nstr = str.replace(/([A-Z])/g,function (match){
            return '-' + match.toLowerCase()
        })
        if(nstr.slice(0,1) === '-'){
            nstr = nstr.slice(1)
        }
        return nstr
    })
}

