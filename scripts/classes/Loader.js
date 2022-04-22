/**
resources: {
    images: [
    {
        name,
        src,
        onLoad,
    }
    ]
    json:[]
],
onResourceLoaded
**/

function Loader(data = {}, onResourceLoaded) {
    this.totalResourcesLoaded = 0;
    this.loadStart = null;
    this.loadEnd = null;
    
    this.images = data.images || [];
    this.jsons = data.jsons || [];
    
    this.totalResourcesToLoad =  this.images.length + this.jsons.length;
    
    //callback called after each resource loads
    this.onResourceLoadedCallback = data.onResourceLoaded || function(){};
}

Loader.prototype.getPercentageLoaded = function() {
    if(
		!this.totalResourcesToLoad
	) {
		return null;
    }
	return this.totalResourcesLoaded / this.totalResourcesToLoad;
};

Loader.prototype.load = async function() {
    this.loadStart = (new Date()).getTime();
    let cache;
    try {
        cache = await Promise.all([
            this.loadImages(this.images, this.onResourceLoaded),
            this.loadJsons(this.jsons, this.onResourceLoaded),
        ]);
    } catch(errorLoadingResources) {
        throw errorLoadingResources;
        return;
    }
    
	this.loadEnd = (new Date()).getTime();
	return {
        images: cache[0],
        jsons: cache[1],
        loadTime: this.loadEnd - this.loadStart, // ms
    }
}

Loader.prototype.loadImage = function(src) {
  return new Promise((resolve, reject) => {
    const elImage = document.createElement('IMG');
    elImage.addEventListener('load', function() {
      resolve(elImage);
    });
    elImage.addEventListener('error', function(errorLoadingImage) {
      reject(errorLoadingImage);
    });
    elImage.src = src;
  });
}

Loader.prototype.loadImages = async function(images, onResourceLoadedCallback) {
    let hasError = false;
    const promiseLoadImages = [];
    for(let imageIndex = (images.length - 1); imageIndex > -1; imageIndex--) {
        promiseLoadImages.push((async function(image){
			try {
				if(hasError) { return }
				const imageCache = await this.loadImage(image.src);
				this.totalResourcesLoaded++;
				if(hasError) { return }
				if(image.onLoad) {
					await image.onLoad({
						cache: imageCache,
					});
				}
				const callback = onResourceLoadedCallback || this.onResourceLoadedCallback;
				if(hasError) { return }
				await callback.call(this, { 
					name: image.name, 
					cache: imageCache,
					percentageLoaded: this.getPercentageLoaded(),
				});
				return imageCache;
            } catch(errorLoadingImage) {
                hasError = true;
                console.log(`Error loading ${image.name}`);
                throw errorLoadingImage;
            }
        }).call(this, images[imageIndex]));
    }
    try {
        const imagesCache = await Promise.all(promiseLoadImages);
        // convert array of image into an obj of images by name
        return imagesCache.reduce((cache, image, index) => {
            cache[images[images.length - index - 1].name] = image;
            return cache;
        }, {});
    } catch(errorLoadingImage) {
        console.log(`Error loading images`);
        console.log(errorLoadingImage);
    }
}

Loader.prototype.loadJson = function(url) {
  return new Promise((resolve, reject) => {
    const request = new XMLHttpRequest();
    request.onreadystatechange = function() {
      // if DONE and SUCCESS
      if ((request.readyState === 4) && (request.status === 200)) {
        resolve(JSON.parse(request.responseText));
      } else {
          reject(request);
      }
    }
    request.open("GET", url + ".json", true);
    request.onError = function(event) { 
      console.log('ERROR!')
      throw new Error(event); 
    };
    request.send();
  });
}

Loader.prototype.loadJsons = async function(jsons, onResourceLoadedCallback) {
    let hasError = false;
    const promiseLoadJsons = [];
    for(let jsonIndex = (jsons.length - 1); jsonIndex > -1; jsonIndex--) {
        promiseLoadJsons.push((async function(json){
			try {
				if(hasError) { return }
				const jsonCache = await this.loadJson(json.src);
				this.totalResourcesLoaded++;
				if(hasError) { return }
				if(json.onLoad) {
					await json.onLoad({
						cache: jsonCache,
					});
				}
				if(hasError) { return }
				await this.onResourceLoadedCallback({ 
					name: json.name, 
					cache: jsonCache,
					percentageLoaded: this.getPercentageLoaded(),
				});
				return jsonCache;
            } catch(errorLoadingJson) {
                hasError = true;
                console.log(`Error loading ${json.name}`);
                throw errorLoadingJson;
            }
        }).call(this, jsons[jsonIndex]));
    }
    try {
        const jsonsCache = await Promise.all(promiseLoadJsons);
        // convert array of jsons into an obj of jsons by name
        return jsonsCache.reduce((cache, json, index) => {
            cache[jsons[jsons.length - index - 1].name] = json;
            return cache;  
        }, {});
    } catch(errorLoadingJson) {
        console.log(`Error loading jsons`);
        console.log(errorLoadingJson);
    }
}

const loader = new Loader({
	images: [
		{
			name: 'test2',
			src: 'https://www.spriters-resource.com/resources/sheets/75/78041.png?updated=1460969069',
			onLoad: function(){
				console.log('test2.onLoad')
				console.log(arguments)
			}
		}
	],
	jsons: [
		{
			name: 'test1',
			src: '../../assets/jsons/test1.json'
		}
	],
	onResourceLoaded: function({ name, cache, percentageLoaded }) {
		console.log('onResourceLoaded')
		console.log(arguments[0])
	}
});

(async function(){
	try {
		const data = await loader.load();
		console.log('data: ', data);
	} catch(e) {
 	   console.log('Error!');
 	   console.log(e)
	}
})()