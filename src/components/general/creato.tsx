import { useState, useContext } from 'react';
import { CreatoColorIcon } from '../../assets/svg';
import { LanguageContext } from '../../routes/authRoute';
// property - popular  discountedPrice

const Creato = (props: any) => {
    const contexts = useContext(LanguageContext);
    const { property, donutCount, discountedPercent, hoverDisable } = props;
    const [isHover, setHover] = useState(false);

    const styles = {
        wrapper: {
            position: 'relative' as const,
            top: isHover === false ? '0px' : '-7px',
            transition: '0.3s',
            margin: '0px',
            padding: '0px',
            width: property === 'popular' ? '108px' : '110px',
            height: '145px',
            cursor: 'pointer',
            background: '#FFFFFF',
            boxShadow: '2px 4px 10px rgba(0, 0, 0, 0.15)',
            borderRadius: '10px',
            border: property === 'popular' ? '2px solid #EFA058' : '0px',
        },
        creatoLogo: {
            position: 'absolute' as const,
            width: '40px',
            height: '40px',
            top: '22px',
            left: '35px',
        },
        donutCount: {
            position: 'absolute' as const,
            width: '60px',
            height: '20px',
            top: '67px',
            left: '25px',
            fontFamily: 'Lato',
            fontStyle: 'normal',
            fontWeight: 600,
            fontSize: '18px',
            lineHeight: '20px',
            textAlign: 'center' as const,
            color: '#000000',
        },
        discounted: {
            position: 'absolute' as const,
            width: '70px',
            height: '14px',
            top: '99px',
            left: '20px',
            fontFamily: 'Lato',
            fontStyle: 'italic',
            fontWeight: 'bold',
            fontSize: '12px',
            lineHeight: '14px',
            textAlign: 'center' as const,
            letterSpacing: '0.02em',
            color: '#EFA058',
        },
        price: {
            position: 'absolute' as const,
            width: '70px',
            height: '18px',
            top: property === 'popular' ? '116px' : '118px',
            left: '20px',
            fontFamily: 'Lato',
            fontStyle: 'normal',
            fontWeight: property === 'popular' ? 'bold' : 'normal',
            fontSize: property === 'popular' ? '16px' : '14px',
            lineHeight: property === 'popular' ? '19px' : '18px',
            textAlign: 'center' as const,
            letterSpacing: '0.005em',
            color: '#000000',
        },
        popular: {
            position: 'absolute' as const,
            width: '110px',
            height: '15px',
            top: '-1px',
            left: '-1px',
            background: '#EFA058',
            boxShadow: '2px 4px 10px rgba(0, 0, 0, 0.15)',
            borderRadius: '10px 10px 0px 0px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        popularLetter: {
            fontFamily: 'Lato',
            fontStyle: 'normal',
            fontWeight: 'normal',
            fontSize: '10px',
            lineHeight: '12px',
            letterSpacing: '0.005em',
            color: '#FFFFFF',
            textAlign: 'center' as const,
        }
    }
    return (
        <div style={styles.wrapper}
            onMouseOver={() => { if (!hoverDisable) setHover(true) }}
            onMouseLeave={() => setHover(false)}
        >
            <div style={styles.creatoLogo}>
                <CreatoColorIcon />
            </div>
            <div style={styles.donutCount}>{donutCount}</div>
            {(property === 'discountedPrice' || property === 'popular') &&
                <div style={styles.discounted}>{contexts.GENERAL_COMPONENT.CREATO.SAVE} {discountedPercent}%</div>
            }
            {property === 'popular' &&
                <div style={styles.popular}>
                    <div style={styles.popularLetter}>MOST POPULAR</div>
                </div>
            }
            <div style={styles.price}>USD${donutCount / 10 * (100 - discountedPercent) / 100}</div>
        </div>
    );
}

export default Creato;