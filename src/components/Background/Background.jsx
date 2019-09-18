import React from 'react';
import Particles from 'react-particles-js';
import './Background.css';

export default function Background() {
    return (
        <div className="particles">
            <Particles className="particles"
                params={{
                    "particles": {
                        "number": {
                            "value": 120,
                            "density": {
                                "enable": true,
                                "value_area": 500
                            }
                        },
                        "line_linked": {
                            "enable": true,
                            "opacity": 0.02
                        },
                        "move": {
                            "direction": "right",
                            "speed": 0.15
                        },
                        "size": {
                            "value": 1.2
                        },
                        "opacity": {
                            "anim": {
                                "enable": true,
                                "speed": 2.5,
                                "opacity_min": 0.15
                            }
                        }
                    },
                    "interactivity": {
                        "events": {
                            "onclick": {
                                "enable": true,
                                "mode": "push"
                            }
                        },
                        "modes": {
                            "push": {
                                "particles_nb": 1
                            }
                        }
                    },
                    "retina_detect": true
                }} />
        </div>
    )
}
